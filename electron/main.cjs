const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

// ─── AUTO-UPDATER: WITH DASHBOARD UI ───────────────────────────────────────────
// Downloads in background, notifies React UI, auto-installs on quit or manual restart.
function setupAutoUpdater() {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;
    autoUpdater.autoRunAppAfterInstall = true;

    if (isDev) {
        console.log('[AutoUpdater] Skipped — running in development mode');
        return;
    }

    // Check immediately on launch
    autoUpdater.checkForUpdates().catch((err) => {
        console.log('[AutoUpdater] Initial check error:', err.message);
    });

    // Check periodically for updates (every 5 minutes to avoid rate limits)
    setInterval(() => {
        autoUpdater.checkForUpdates().catch((err) => {
            console.log('[AutoUpdater] Periodic check error:', err.message);
        });
    }, 300000); // 5 minutes check

    function notifyUI(status, data = {}) {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('update-status', { status, ...data });
        }
    }

    autoUpdater.on('update-available', (info) => {
        console.log('[AutoUpdater] Update available:', info.version, '— downloading silently...');
        notifyUI('available', { version: info.version });
    });

    autoUpdater.on('download-progress', (progress) => {
        console.log(`[AutoUpdater] Downloading: ${Math.round(progress.percent)}%`);
        notifyUI('downloading', { percent: Math.round(progress.percent) });
    });

    autoUpdater.on('update-downloaded', (info) => {
        console.log('[AutoUpdater] Update downloaded:', info.version, '— ready to restart.');
        notifyUI('ready', { version: info.version });
    });

    ipcMain.on('restart-for-update', () => {
        autoUpdater.quitAndInstall(true, true);
    });

    autoUpdater.on('error', (err) => {
        console.log('[AutoUpdater] Error:', err.message);
    });
}

// ─── WINDOW CREATION ─────────────────────────────────────────────────────────
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const iconPath = path.join(__dirname, 'teletraan.png');

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        icon: iconPath,
        backgroundColor: '#0A0A0A',
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    mainWindow.maximize();

    const { Menu } = require('electron');
    Menu.setApplicationMenu(null);

    // Completely lock down the window from native right-clicks
    mainWindow.webContents.on('context-menu', (e) => {
        e.preventDefault();
    });

    // Prevent drag and drop navigations into the electron window
    mainWindow.webContents.on('will-navigate', (e) => {
        e.preventDefault();
    });

    // Dev mode shortcuts
    mainWindow.webContents.on('before-input-event', (event, input) => {
        // KILL DEFAULT RELOAD (Ctrl+R, F5) TO ALLOW CUSTOM SYSTEM RELOAD
        if ((input.control && input.key.toLowerCase() === 'r') || input.key === 'F5') {
            event.preventDefault();
            mainWindow.webContents.send('soft-reload-trigger');
            return;
        }

        if (isDev && input.control && input.shift && input.key.toLowerCase() === 'i') {
            mainWindow.webContents.toggleDevTools();
            event.preventDefault();
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    if (isDev) {
        // Retry connecting to Vite dev server — it may not be ready yet
        const loadDevURL = () => {
            mainWindow.webContents.session.clearCache().then(() => {
                mainWindow.loadURL('http://localhost:5173').catch((err) => {
                    console.log('[Dev] Vite not ready yet, retrying in 500ms...', err.message);
                    setTimeout(loadDevURL, 500);
                });
            });
        };
        loadDevURL();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Window controls
    ipcMain.on('window-minimize', () => mainWindow.minimize());
    ipcMain.on('window-maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on('window-close', () => mainWindow.close());

    // Physical Window Shake (Desktop Vibration Simulation)
    ipcMain.on('window-shake', () => {
        if (!mainWindow) return;
        const [x, y] = mainWindow.getPosition();
        const intensity = 4;
        const duration = 200;
        const startTime = Date.now();

        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const dx = Math.floor(Math.random() * intensity * 2) - intensity;
                const dy = Math.floor(Math.random() * intensity * 2) - intensity;
                mainWindow.setPosition(x + dx, y + dy);
                setTimeout(shake, 20);
            } else {
                mainWindow.setPosition(x, y);
            }
        };
        shake();
    });

    // SYSTEM LOGIC: Real Telemetry (Battery & Network)
    let isConnected = true;
    let manualOffline = false; // Manual Kill Switch
    const startTime = Date.now();



    // Function to check real network status
    function updateNetworkStatus() {
        const interfaces = os.networkInterfaces();
        let found = false;
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        isConnected = found;
    }

    ipcMain.on('toggle-network', () => {
        manualOffline = !manualOffline;
        console.log(`[System] Tactical Override: ${manualOffline ? 'OFFLINE' : 'ONLINE'}`);
        broadcastStats();
    });

    ipcMain.on('set-network-state', (event, state) => {
        // state: true for online (manualOffline = false), false for offline (manualOffline = true)
        manualOffline = !state;
        console.log(`[System] Tactical Explicit Set: ${manualOffline ? 'OFFLINE' : 'ONLINE'}`);
        broadcastStats();
    });

    function broadcastStats() {
        if (!mainWindow) return;

        const stats = {
            net: (isConnected && !manualOffline) ? 1 : 0, // Force 0 if manual offline
            uptime: Math.floor((Date.now() - startTime) / 1000)
        };

        mainWindow.webContents.send('system-stats', stats);
    }

    // Initial check
    updateNetworkStatus();

    // Periodic Update (every 5 seconds for real sync)
    const statsInterval = setInterval(() => {
        updateNetworkStatus();
        broadcastStats();
    }, 5000);

    mainWindow.on('closed', () => {
        clearInterval(statsInterval);
        mainWindow = null;
    });
}

// ─── APP LIFECYCLE ───────────────────────────────────────────────────────────
app.whenReady().then(() => {
    createWindow();
    setupAutoUpdater();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
