import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import UpdateNotification from './components/UpdateNotification';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [stage, setStage] = useState('auth');
    const [refreshKey, setRefreshKey] = useState(0);

    // Completely lock down the application to prevent any copying, inspecting, or saving
    useEffect(() => {
        const preventAction = (e) => e.preventDefault();

        // 1. Block Context Menu (Right Click)
        document.addEventListener('contextmenu', preventAction);

        // 2. Block Dragging
        document.addEventListener('dragstart', preventAction);

        // 3. Block Text Selection
        document.addEventListener('selectstart', preventAction);

        // 4. Block specific keyboard shortcuts
        const handleKeyDown = (e) => {
            // Block Ctrl+S / Cmd+S (Save)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); return; }
            // Block Ctrl+C / Cmd+C (Copy)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') { e.preventDefault(); return; }
            // Block Ctrl+P / Cmd+P (Print)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') { e.preventDefault(); return; }
            // Block F12 (DevTools)
            if (e.key === 'F12') { e.preventDefault(); return; }
            // Block Ctrl+Shift+I / Cmd+Option+I (DevTools via Keyboard)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') { e.preventDefault(); return; }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', preventAction);
            document.removeEventListener('dragstart', preventAction);
            document.removeEventListener('selectstart', preventAction);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLogin = () => {
        setStage('loading');
    };

    const handleLoadingComplete = () => {
        setStage('active');
    };

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="bg-void w-screen h-screen overflow-hidden text-white font-sans selection:bg-[#00FF41] selection:text-black">
            <UpdateNotification />
            <AnimatePresence>
                {stage === 'auth' && <Login onLogin={handleLogin} key="login" />}
                {stage === 'loading' && <Loading key="loading" onComplete={handleLoadingComplete} />}
                {stage === 'active' && <Dashboard key={`dashboard-${refreshKey}`} onLogout={() => setStage('auth')} onRefresh={handleRefresh} />}
            </AnimatePresence>
        </div>
    );
}

export default App;
