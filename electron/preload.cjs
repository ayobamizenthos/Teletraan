const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
    windowShake: () => ipcRenderer.send('window-shake'),
});

contextBridge.exposeInMainWorld('api', {
    onSystemStats: (callback) => ipcRenderer.on('system-stats', (event, stats) => callback(stats)),
    onSoftReload: (callback) => ipcRenderer.on('soft-reload-trigger', () => callback()),
    toggleNetwork: () => ipcRenderer.send('toggle-network'),
    setNetworkState: (state) => ipcRenderer.send('set-network-state', state),
    onUpdateStatus: (callback) => ipcRenderer.on('update-status', (event, data) => callback(data)),
    restartForUpdate: () => ipcRenderer.send('restart-for-update'),
});
