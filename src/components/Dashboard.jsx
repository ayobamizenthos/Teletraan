import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin, Minus, Square, X, Bell, RefreshCw, Key, Wrench, Loader2, Wifi, Activity, CheckCircle2,
    LayoutGrid, FileText, Shield, Users, Settings, LogOut, Video, Radio, WifiOff, FileWarning, ArrowRight, Plus, Cctv, Search, ChevronDown, Edit2, ChevronLeft, ChevronRight, AlertTriangle, ScanFace, DoorOpen, Sofa, Car, TreePine, Utensils, Camera, Clock, Link, Maximize, Power
} from 'lucide-react'

import zenthosImg from '../assets/Zenthos.png'
import dmIcon from '../assets/dm.svg'
import rfIcon from '../assets/rf.svg'
import saIcon from '../assets/sa.svg'
import teletraanLogo from '../assets/teletraan.svg'
import secCamSvg from '../assets/sec-cam.svg'

import basementImg from '../assets/cameras/basement.png'
import entranceImg from '../assets/cameras/entrance_threat.png'
import garageImg from '../assets/cameras/garage.png'
import exitImg from '../assets/cameras/exit.png'
import WindowControls from './WindowControls'

const font = {
    header: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
}

const RfIcon = ({ size, className }) => <img src={rfIcon} className={className} style={{ width: size, height: size }} alt="RF" />
const SaIcon = ({ size, className }) => <img src={saIcon} className={className} style={{ width: size, height: size }} alt="SA" />
const DmIcon = ({ size, className }) => <img src={dmIcon} className={className} style={{ width: size, height: size }} alt="DM" />

const logPool = [
    { title: 'New device pair', type: 'system' },
    { title: 'Motion detected', type: 'alert' },
    { title: 'Unknown face', type: 'alert' },
    { title: 'Signal restored', type: 'system' },
    { title: 'Signal lost', type: 'alert' },
    { title: 'Door opened', type: 'system' },
    { title: 'Terminal entry', type: 'system' },
    { title: 'Key updated', type: 'system' },
    { title: 'Scan active', type: 'system' },
    { title: 'System ready', type: 'system' },
];

const navGroups = [
    {
        header: "Surveillance",
        items: [
            { icon: Cctv, label: "Security Cameras" },
            { icon: Radio, label: "Primus" },
            { icon: RfIcon, label: "Recorded Footage" }
        ]
    },
    {
        header: "Alerts & Log",
        items: [
            { icon: SaIcon, label: "Security Alerts" },
            { icon: FileText, label: "Alert Log" }
        ]
    },
    {
        header: "Access Control",
        items: [
            { icon: Key, label: "Manage Access" }
        ]
    },
    {
        header: "Teams",
        items: [
            { icon: Users, label: "User & Roles" }
        ]
    },
    {
        header: "Settings",
        items: [
            { icon: Settings, label: "System Settings" },
            { icon: DmIcon, label: "Device Management" }
        ]
    }
];

const DigitalClock = React.memo(() => {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const d = new Date();
            const date = d.toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' }).replace(/-/g, '.');
            const timeStr = d.toLocaleTimeString('en-GB', {
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false, timeZone: 'Africa/Lagos'
            });
            setTime(`${date} ${timeStr}`);
        };
        const t = setInterval(update, 1000);
        update();
        return () => clearInterval(t);
    }, []);
    return <span className="text-[11px] font-bold text-white/60 group-hover/time:text-white/90 font-mono tracking-tight tabular-nums transition-colors">{time.split(' ')[1]}</span>;
});

const FeedCell = React.memo(({ label, active = true, alert = false, offline = false, systemNet = 100, image = null }) => {
    const camId = useRef(`OX-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(10).substr(2, 2)}`);

    const [signal, setSignal] = useState(4);
    const isActuallyOffline = offline || systemNet === 0;

    useEffect(() => {
        if (isActuallyOffline) return;
        const interval = setInterval(() => {
            setSignal(s => Math.random() > 0.65 ? 4 : 3);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(interval);
    }, [isActuallyOffline]);

    return (
        <div className="relative w-full h-full bg-[#111113] overflow-hidden flex flex-col border border-white/[0.15] rounded-[4px] group transition-all duration-500 hover:border-white/20">
            { }
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.08]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />
            {isActuallyOffline ? (
                <>
                    { }
                    <div className="absolute inset-0 bg-[#111113]">
                        <div className="w-full h-full opacity-[0.1]"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}
                        />
                        { }
                        <div className="absolute top-4 left-6 right-6 flex justify-between items-start z-20">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/50 uppercase">{label || 'SOURCE-01'}</span>
                            </div>
                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                            <motion.div
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <WifiOff size={42} className="text-white/40 mb-3" strokeWidth={1.5} />
                                <span className="text-white/50 font-mono text-[11px] tracking-[0.4em] uppercase font-bold">
                                    {systemNet === 0 ? 'Scanning...' : 'Signal Lost'}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    { }
                    {image ? (
                        <div className="absolute inset-0 z-0">
                            <img src={image} className="w-full h-full object-cover" alt={label} />
                        </div>
                    ) : (
                        <>
                            { }
                            <div className="absolute inset-0 opacity-[0.25]"
                                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                            />

                            { }
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent h-[10%] w-full animate-scan pointer-events-none" style={{ animationDuration: '24s' }} />

                            { }
                            <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-20 pointer-events-none bg-white/[0.05] rounded-full">
                                <div className="w-[1px] h-4 bg-white/40" />
                                <div className="absolute h-[1px] w-4 bg-white/40" />
                            </div>
                        </>
                    )}

                    { }
                    <div className="absolute top-4 left-6 right-6 flex justify-between items-start z-20">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-[#00FF41] shadow-[0_0_8px_#00FF41]'}`} />
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase">{label || 'SOURCE-01'}</span>
                        </div>

                        { }
                        <div className="flex items-end gap-[3px] h-3 pb-0.5">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${25 + (i * 18.75)}%`,
                                        backgroundColor: (signal >= i && systemNet > 0) ? "#00FF41" : "rgba(255, 255, 255, 0.08)",
                                        boxShadow: (signal >= i && systemNet > 0) ? "0 0 10px rgba(0, 255, 65, 0.5)" : "none"
                                    }}
                                    className="w-[2.5px] rounded-[0.5px] transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    { }
                    <div className="absolute bottom-4 left-6 right-6 flex justify-end items-end z-20 transition-opacity duration-300 group-hover:opacity-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] border border-white/10 rounded-[2px]">
                            <Cctv size={10} className="text-white/40" />
                            <span className="text-[8px] font-mono font-bold text-white/60 uppercase tracking-widest">Live Link</span>
                        </div>
                    </div>

                    {alert && <div className="absolute inset-0 border-[3px] border-red-500/80 bg-red-500/20 shadow-[inset_0_0_120px_rgba(239,68,68,0.5)] animate-pulse z-20 pointer-events-none" />}
                </>
            )}

            { }
            <div className={`absolute top-3 left-3 w-4 h-4 border-t border-l ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
        </div>
    );
});

const Dashboard = ({ onLogout, onRefresh }) => {
    const [userProfile, setUserProfile] = useState({
        name: 'AYOBAMI ZENTHOS',
        email: 'ayobamizenthos@gmail.com',
        phone: '+234 811 538 3780',
        image: zenthosImg,
        securityKey: '............'
    })
    const [sidebarHover, setSidebarHover] = useState(false)
    const [sidebarInitOpen, setSidebarInitOpen] = useState(true)
    const [currentLocation, setCurrentLocation] = useState('All')
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const [currentCamera, setCurrentCamera] = useState('All cameras')
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [isCameraDetailOpen, setIsCameraDetailOpen] = useState(false)
    const [isReloading, setIsReloading] = useState(false)
    const [activeGridCamera, setActiveGridCamera] = useState('Basement')
    const [activeTab, setActiveTab] = useState("Security Cameras")
    const [isSetupOpen, setIsSetupOpen] = useState(false)
    const [setupMethod, setSetupMethod] = useState(null)
    const [setupStep, setSetupStep] = useState(1)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isPrimusConnectOpen, setIsPrimusConnectOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [deviceType, setDeviceType] = useState('Select Hardware...')
    const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeEditField, setActiveEditField] = useState(null)
    const [isVibrating, setIsVibrating] = useState(false)
    const [activeNotificationTab, setActiveNotificationTab] = useState('ADMIN')
    const [selectedMessageId, setSelectedMessageId] = useState(null)

    const allSearchItems = React.useMemo(() => [
        { category: 'Pages', label: 'Security Cameras', keywords: 'cameras surveillance cctv live feed', icon: Cctv, action: () => { setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Pages', label: 'Primus', keywords: 'primus connection hub network', icon: Radio, action: () => { setActiveTab('Primus'); setSearchQuery('') } },
        { category: 'Pages', label: 'Recorded Footage', keywords: 'recorded footage playback video history', icon: Video, action: () => { setActiveTab('Recorded Footage'); setSearchQuery('') } },
        { category: 'Pages', label: 'Security Alerts', keywords: 'security alerts warnings notifications', icon: Shield, action: () => { setActiveTab('Security Alerts'); setSearchQuery('') } },
        { category: 'Pages', label: 'Alert Log', keywords: 'alert log history events timeline', icon: FileText, action: () => { setActiveTab('Alert Log'); setSearchQuery('') } },
        { category: 'Pages', label: 'Manage Access', keywords: 'access control permissions keys', icon: Key, action: () => { setActiveTab('Manage Access'); setSearchQuery('') } },
        { category: 'Pages', label: 'User & Roles', keywords: 'users roles teams members admin', icon: Users, action: () => { setActiveTab('User & Roles'); setSearchQuery('') } },
        { category: 'Pages', label: 'System Settings', keywords: 'system settings configuration preferences', icon: Settings, action: () => { setActiveTab('System Settings'); setSearchQuery('') } },
        { category: 'Pages', label: 'Device Management', keywords: 'device management hardware sensors', icon: Settings, action: () => { setActiveTab('Device Management'); setSearchQuery('') } },
        { category: 'Cameras', label: 'Basement Camera', keywords: 'basement cam feed', icon: Video, action: () => { setActiveGridCamera('Basement'); setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Cameras', label: 'Entrance Camera', keywords: 'entrance front cam feed', icon: Video, action: () => { setActiveGridCamera('Entrance'); setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Cameras', label: 'Exit Camera', keywords: 'exit back cam feed', icon: Video, action: () => { setActiveGridCamera('Exit'); setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Cameras', label: 'Garage Camera', keywords: 'garage parking cam feed', icon: Video, action: () => { setActiveGridCamera('Garage'); setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Cameras', label: 'Staircase Camera', keywords: 'staircase stairs cam feed', icon: Video, action: () => { setActiveGridCamera('Staircase'); setActiveTab('Security Cameras'); setSearchQuery('') } },
        { category: 'Profile', label: userProfile.name, keywords: 'profile account user me my avatar photo picture settings logout', icon: Users, isProfile: true, action: () => { setIsProfileOpen(true); setSearchQuery('') } },
        { category: 'Actions', label: 'Notifications', keywords: 'notifications alerts messages inbox bell', icon: Bell, action: () => { setIsNotificationsOpen(true); setSearchQuery('') } },
        { category: 'Actions', label: 'Connect to Primus', keywords: 'connect primus network pair hub', icon: Radio, action: () => { setIsPrimusConnectOpen(true); setSearchQuery('') } },
        { category: 'Actions', label: 'Add Camera', keywords: 'add camera new setup device', icon: Plus, action: () => { setIsSetupOpen(true); setSearchQuery('') } },
        { category: 'Actions', label: 'Log Out', keywords: 'logout sign out exit session end', icon: LogOut, action: () => { setIsLogoutModalOpen(true); setSearchQuery('') } },
    ], [userProfile.name]);

    const nameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const securityKeyInputRef = useRef(null)
    const phoneInputRef = useRef(null)
    const audioCtxRef = useRef(null)

    useEffect(() => {
        const unlockAudio = () => {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };
        window.addEventListener('click', unlockAudio, { once: true });
        return () => window.removeEventListener('click', unlockAudio);
    }, []);

    const playHapticThud = () => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const playPulse = (time, freq, dur, vol, type = 'sine') => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, time);
                osc.frequency.exponentialRampToValueAtTime(freq / 2, time + dur);
                gain.gain.setValueAtTime(vol, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + dur);
            };

            const now = ctx.currentTime;

            playPulse(now, 800, 0.04, 0.1, 'triangle');

            playPulse(now + 0.05, 120, 0.15, 0.4, 'sine');

            playPulse(now + 0.05, 60, 0.2, 0.2, 'sine');

        } catch (e) {
            console.warn('Audio haptic failed', e);
        }
    }

    const playConnectSound = () => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const playPulse = (time, freq, dur, vol, type = 'sine') => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, time);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, time + dur);
                gain.gain.setValueAtTime(vol, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(time);
                osc.stop(time + dur);
            };

            const now = ctx.currentTime;
            playPulse(now, 440, 0.1, 0.2, 'sine');
            playPulse(now + 0.08, 880, 0.12, 0.15, 'sine');
        } catch (e) { console.warn('Connect sound failed', e); }
    }
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackProgress, setPlaybackProgress] = useState(40)
    const [cameraRegistry, setCameraRegistry] = useState({
        'Basement': { label: 'BASEMENT', offline: false },
        'Entrance': { label: 'ENTRANCE', alert: true },
        'Exit': { label: 'EXIT', offline: false },
        'Garage': { label: 'GARAGE', offline: false }
    })

    useEffect(() => {
        if (!activeEditField) return;
        const timer = setTimeout(() => {
            if (activeEditField === 'name') nameInputRef.current?.focus()
            if (activeEditField === 'email') emailInputRef.current?.focus()
            if (activeEditField === 'securityKey') securityKeyInputRef.current?.focus()
            if (activeEditField === 'phone') phoneInputRef.current?.focus()
        }, 50)
        return () => clearTimeout(timer)
    }, [activeEditField])

    const [primusConnectStep, setPrimusConnectStep] = useState(1)
    const [primusForm, setPrimusForm] = useState({ site: '', label: '', location: '', description: '' })
    const [systemStats, setSystemStats] = useState({ net: 0, uptime: 0 })
    const isBootingRef = useRef(true)
    const lastReceivedStatsRef = useRef({ net: 100, uptime: 0 })

    useEffect(() => {

        const timer = setTimeout(() => {
            isBootingRef.current = false
            setSystemStats(lastReceivedStatsRef.current)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const [gridNetStatus, setGridNetStatus] = useState([0, 0, 0, 0])

    useEffect(() => {
        if (systemStats.net > 0 && !isReloading) {

            const t1 = setTimeout(() => setGridNetStatus(prev => [100, prev[1], prev[2], prev[3]]), 100)
            const t2 = setTimeout(() => setGridNetStatus(prev => [100, 100, prev[2], prev[3]]), 600)
            const t3 = setTimeout(() => setGridNetStatus(prev => [100, 100, 100, prev[3]]), 1100)
            const t4 = setTimeout(() => setGridNetStatus(prev => [100, 100, 100, 100]), 1600)
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
        } else {
            setGridNetStatus([0, 0, 0, 0])
        }
    }, [systemStats.net, isReloading])
    const [showPrimusToast, setShowPrimusToast] = useState(false)
    const prevNetRef = useRef(0)
    const primusDotRef = useRef(null)
    const [primusDotY, setPrimusDotY] = useState(0)

    const [securityLogs, setSecurityLogs] = useState([
        { id: 1, time: '04:19:39', title: 'Unknown face detected', type: 'alert' },
        { id: 2, time: '04:15:33', title: 'Signal restored', type: 'system' },
        { id: 3, time: '04:10:22', title: 'Motion detected', type: 'alert' },
        { id: 4, time: '04:05:15', title: 'Door locked', type: 'system' },
        { id: 5, time: '04:00:10', title: 'Scan approved', type: 'system' },
        { id: 6, time: '03:55:08', title: 'Signal lost', type: 'alert' },
        { id: 7, time: '03:50:55', title: 'Link success', type: 'system' },
    ])

    const [logoutHover, setLogoutHover] = useState(false);
    const [netHover, setNetHover] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    useEffect(() => {
        const timer = setTimeout(() => setSidebarInitOpen(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    const sidebarOpen = sidebarHover || sidebarInitOpen

    const [notificationGroups, setNotificationGroups] = useState({
        'ADMIN': [
            { id: 1, sender: "ADMIN", text: "Security settings have been updated. Terminal session remains active.", time: "10:23 AM", type: 'inbound' },
            { id: 2, sender: "ADMIN", text: "New system node has been connected. Session encryption verified.", time: "11:05 AM", type: 'inbound' }
        ],
        'SUPPORT': [
            { id: 4, sender: "NETWORK OPS", text: "Network congestion detected. Automated traffic management initiated.", time: "09:15 AM", type: 'inbound' },
            { id: 5, sender: "NETWORK OPS", text: "System link verified. Performance optimized for current workload.", time: "09:45 AM", type: 'inbound' }
        ],
        'SECURITY': [
            { id: 6, sender: "SECURITY LEAD", text: "Unusual activity blocked on external port. System isolated for safety.", time: "08:12 AM", type: 'inbound' },
            { id: 7, sender: "SECURITY LEAD", text: "Security clearance level maintained. Access logs have been secured.", time: "08:45 AM", type: 'inbound' }
        ]
    })

    const locationRef = useRef(null)
    const cameraRef = useRef(null)

    const handleRestart = () => {
        setIsLogoutModalOpen(false)
        setSystemStats(prev => ({ ...prev, net: 0 }))
        prevNetRef.current = 0
        setShowPrimusToast(false)
        setSidebarInitOpen(true)
        setTimeout(() => setSidebarInitOpen(false), 5000)
        setIsReloading(true)
        setTimeout(() => {
            if (onRefresh) onRefresh()
            setIsReloading(false)
        }, 3000)
    }

    const handleSoftReload = React.useCallback(() => {
        setIsReloading(true)

        setSystemStats(prev => ({ ...prev, net: 0 }))
        prevNetRef.current = 0
        setShowPrimusToast(false)

        setTimeout(() => {
            if (onRefresh) onRefresh()
            setIsReloading(false)
        }, 3000)
    }, [onRefresh])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsLocationOpen(false)
            }
            if (cameraRef.current && !cameraRef.current.contains(event.target)) {
                setIsCameraOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (window.api && window.api.onSystemStats) {
            window.api.onSystemStats((stats) => {
                lastReceivedStatsRef.current = stats
                if (!isBootingRef.current) {
                    setSystemStats(stats)
                }
            })
        }
        if (window.api && window.api.onSoftReload) {
            window.api.onSoftReload(() => {
                handleSoftReload();
            })
        }
    }, [handleSoftReload])

    useEffect(() => {

        if (prevNetRef.current !== undefined && prevNetRef.current !== systemStats.net) {

            if (window.electron && window.electron.windowShake) {
                window.electron.windowShake();
            }

            if (systemStats.net > 0) {
                playConnectSound();
            } else {
                playHapticThud();
            }

            if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100])
            }

            setIsVibrating(true)
            const vibrateTimer = setTimeout(() => setIsVibrating(false), 300)

            if (prevNetRef.current === 0 && systemStats.net > 0) {
                if (primusDotRef.current) {
                    const rect = primusDotRef.current.getBoundingClientRect()
                    setPrimusDotY(rect.top + rect.height / 2)
                }
                setShowPrimusToast(true)
                setTimeout(() => setShowPrimusToast(false), 6000)
            }
            prevNetRef.current = systemStats.net
            return () => clearTimeout(vibrateTimer)
        }
        prevNetRef.current = systemStats.net
    }, [systemStats.net])

    useEffect(() => {
        if (sidebarHover) setShowPrimusToast(false)
    }, [sidebarHover])

    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.ctrlKey && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                onLogout();
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                window.api?.setNetworkState?.(false);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'c') {
                e.preventDefault();
                window.api?.setNetworkState?.(true);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                setIsProfileOpen(true);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                setIsNotificationsOpen(true);
            }

            if (e.ctrlKey && e.key.toLowerCase() === 'r') {
                e.preventDefault();
                handleSoftReload();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onLogout, handleSoftReload, setIsNotificationsOpen]);

    const toggleFullscreen = () => {
        const element = document.getElementById('camera-full-view');
        if (!document.fullscreenElement) {
            element?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const getPlaybackTime = (progress) => {
        const totalSeconds = (progress / 100) * 24 * 3600;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }

    const handleSliderInteraction = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const update = (clientX) => {
            const x = clientX - rect.left;
            const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setPlaybackProgress(newProgress);
        };

        update(e.clientX);

        const onMouseMove = (moveEvent) => update(moveEvent.clientX);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    const toggleCameraConnection = (cameraName) => {
        setCameraRegistry(prev => ({
            ...prev,
            [cameraName]: {
                ...prev[cameraName],
                offline: !prev[cameraName].offline
            }
        }))
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'a') {
                e.preventDefault()
                setCameraRegistry(prev => {
                    const anyOnline = Object.values(prev).some(cam => !cam.offline)
                    const newState = {}
                    for (const key in prev) {
                        newState[key] = {
                            ...prev[key],
                            offline: anyOnline
                        }
                    }
                    return newState
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        let timeoutId

        const addLog = () => {
            const randomLog = logPool[Math.floor(Math.random() * logPool.length)]
            const newLog = {
                id: Date.now() + Math.random(),
                time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                ...randomLog
            }

            setSecurityLogs(prev => [newLog, ...prev.slice(0, 8)])

            const nextDelay = Math.floor(Math.random() * 20000) + 10000
            timeoutId = setTimeout(addLog, nextDelay)
        }

        addLog()

        return () => clearTimeout(timeoutId)
    }, [])

    const locations = ["All", "Entrance", "Exit", "Garage", "Basement"]
    const cameras = ["All cameras", "7368770-b53e-4b3b-9096-c81cbd852edb"]

    const activeItem = navGroups.flatMap(group => group.items).find(item => item.label === activeTab)
    const ActiveIcon = activeItem?.icon

    return (
        <motion.div
            animate={isVibrating ? {
                x: [0, -4, 4, -4, 4, 0],
                y: [0, 2, -2, 2, -2, 0]
            } : {}}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full flex bg-void text-[#F2F2F7] font-sans overflow-hidden"
        >

            { }
            <motion.nav
                onHoverStart={() => setSidebarHover(true)}
                onHoverEnd={() => setSidebarHover(false)}
                initial={{ x: -100, opacity: 0, width: 300 }}
                animate={{ x: 0, opacity: 1, width: (sidebarHover || sidebarInitOpen) ? 300 : 82 }}
                transition={{
                    x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.8 },
                    width: { type: "spring", stiffness: 120, damping: 24 }
                }}
                className="h-full bg-[#111113] flex flex-col pb-6 shrink-0 z-40 relative shadow-[2px_0_20px_rgba(0,0,0,0.5)] rounded-r-2xl"
            >
                { }
                <div className="absolute top-20 right-0 bottom-0 left-0 border-r border-t border-white/[0.18] rounded-tr-[40px] pointer-events-none" />
                { }
                <div className="h-20 mb-36 flex items-center whitespace-nowrap transition-all duration-300 z-50 shrink-0 select-none overflow-visible w-full">
                    { }
                    <div className="w-[82px] shrink-0 flex items-center justify-center pointer-events-none" style={{ perspective: '1000px' }}>
                        <motion.img
                            layoutId="unified-logo"
                            src={teletraanLogo}
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: sidebarOpen ? 360 : 0 }}
                            transition={{
                                rotateY: { duration: 0.8, ease: "easeOut" },
                                layout: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                            }}
                            className="w-[60px] h-[60px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            style={{ transformStyle: 'preserve-3d' }}
                            alt="Teletraan"
                        />
                    </div>
                    <span className={`-ml-2 text-[30px] font-black tracking-[0.1em] uppercase bg-gradient-to-b from-[#F9F9FB] via-[#D1D1D6] to-[#8E8E93] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(209,209,214,0.15)] transition-all duration-300 ${sidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                        Teletraan
                    </span>
                </div>

                { }
                <div className={`flex-1 overflow-x-hidden overflow-y-auto flex flex-col gap-2 px-3 scrollbar-hide transition-all duration-300`}>
                    {navGroups.map((group, i) => (
                        <div key={i} className={`flex flex-col ${sidebarOpen ? 'gap-1' : 'gap-2'}`}>
                            {group.header && (
                                <motion.div
                                    animate={{ opacity: sidebarOpen ? 1 : 0, height: sidebarOpen ? 'auto' : 0 }}
                                    className="px-3 text-[13px] font-mono text-[#777777] uppercase tracking-widest mb-1 whitespace-nowrap overflow-hidden"
                                >
                                    {group.header}
                                </motion.div>
                            )}

                            { }
                            {group.items.map((item, j) => {
                                const isActive = activeTab === item.label
                                return (
                                    <div key={j} className="relative group/item">
                                        <div
                                            onClick={() => setActiveTab(item.label)}
                                            className={`
                                        relative flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-500 whitespace-nowrap overflow-hidden rounded-xl
                                        ${isActive
                                                    ? 'text-white border border-white/[0.15] shadow-[0_0_0_3px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.06)]'
                                                    : 'text-[#AAAAAA] hover:text-[#F2F2F7] border border-transparent hover:border-white/[0.18]'
                                                }
                                    `}>
                                            { }
                                            {isActive && (
                                                <div className="absolute left-0 top-[20%] bottom-[20%] w-[2px] bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                            )}

                                            { }
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-transparent pointer-events-none" />
                                            )}

                                            <item.icon size={22} strokeWidth={1.5} className={`shrink-0 z-10 transition-all duration-300
                                                ${item.label === 'Primus'
                                                    ? (systemStats.net > 0 ? '!text-[#00FF41] drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]' : '!text-[#FF3B30] drop-shadow-[0_0_15px_rgba(255,59,48,0.8)]')
                                                    : (isActive ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] brightness-150' : 'opacity-70 group-hover:opacity-100')}`} />

                                            <motion.span
                                                animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                                                className={`text-[15px] tracking-wide z-10 ${isActive ? 'font-semibold text-white' : 'font-medium'}`}
                                            >
                                                {item.label}
                                            </motion.span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>

                { }
                <div className="px-3 shrink-0">
                    <div
                        className={`
                            relative flex items-center gap-4 px-3 py-3 rounded-[2px] transition-all duration-500 whitespace-nowrap cursor-pointer group/primus
                            ${sidebarOpen
                                ? (systemStats.net > 0
                                    ? 'bg-white/[0.02] border border-white/[0.18] hover:border-[#00FF41]/30'
                                    : 'bg-white/[0.02] border border-white/[0.18] hover:border-white/10')
                                : 'border border-transparent'}
                        `}
                        onClick={() => { setActiveTab('Primus'); }}
                    >
                        { }
                        <div ref={primusDotRef} className="relative flex items-center justify-center w-[24px] h-[24px] shrink-0">
                            <div className={`w-3 h-3 rounded-full transition-all duration-700 ${systemStats.net > 0
                                ? 'bg-[#00FF41] shadow-[0_0_12px_rgba(0,255,65,0.6)]'
                                : 'bg-white/20'}`}
                            />
                            {systemStats.net > 0 && (
                                <div className="absolute inset-[-4px] flex items-center justify-center pointer-events-none">
                                    <div className="w-full h-full rounded-full border border-[#00FF41]/25 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                                </div>
                            )}
                        </div>

                        { }
                        <motion.span
                            animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                            className={`text-[11px] font-bold font-mono tracking-[0.15em] uppercase whitespace-nowrap leading-none transition-colors ${systemStats.net > 0 ? 'text-white/70' : 'text-white/30'}`}
                        >
                            Primus {systemStats.net > 0 ? 'Connected' : 'Offline'}
                        </motion.span>
                    </div>
                </div>

                { }
                <AnimatePresence>
                    {showPrimusToast && systemStats.net > 0 && !sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ type: 'spring', stiffness: 40, damping: 12, delay: 0.5 }}
                            className="fixed left-[92px] z-[100] pointer-events-none"
                            style={{ top: primusDotY ? primusDotY - 8 : '50%' }}
                        >
                            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#00FF41] whitespace-nowrap drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]">
                                Primus Connected
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                { }
                <div className="px-3 mt-4 mb-2 whitespace-nowrap overflow-hidden">
                    <div
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="group relative flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 text-[#666] hover:text-white border border-transparent hover:border-white/[0.15]"
                    >
                        <LogOut size={22} strokeWidth={1.5} className="shrink-0 transition-all duration-300" />

                        <motion.span
                            animate={{ opacity: sidebarOpen ? 1 : 0, x: sidebarOpen ? 0 : -10 }}
                            className="text-[15px] font-medium tracking-wide"
                        >
                            Log Out
                        </motion.span>

                        { }
                        {!sidebarOpen && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                <div className="px-3 py-1.5 bg-[#1A1A1A] border border-white/10 rounded-[4px] shadow-lg">
                                    <span className="text-[11px] font-mono font-bold tracking-[0.1em] uppercase text-white/80 whitespace-nowrap">Log Out</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.nav>

            { }
            <div className="flex-1 flex flex-col relative h-full bg-void">
                { }
                <header className="h-24 w-full border-b border-white/[0.18] bg-[#111113]/80 backdrop-blur-md shrink-0 z-20 electron-draggable relative">

                    { }
                    <div className="absolute inset-0 px-6 grid grid-cols-[1fr_260px] gap-6 pointer-events-none">
                        <div className="flex items-center justify-center">
                            <div className={`flex items-center gap-4 select-none transition-all duration-500 ${sidebarOpen ? 'blur-[6px] opacity-40' : 'blur-0 opacity-100'}`}>
                                {ActiveIcon && (
                                    <ActiveIcon
                                        size={28}
                                        className={`${(activeTab === 'Primus' || systemStats.net === 0)
                                            ? (systemStats.net > 0 ? 'text-[#00FF41] drop-shadow-[0_0_12px_rgba(0,255,65,0.4)]' : 'text-[#FF3B30] drop-shadow-[0_0_12px_rgba(255,59,48,0.4)]')
                                            : 'text-[#F2F2F7] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'} transition-all duration-300`}
                                    />
                                )}
                                <span className={`text-[24px] font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${systemStats.net === 0 ? 'text-[#FF3B30] drop-shadow-[0_0_15px_rgba(255,59,48,0.3)]' : 'text-[#F2F2F7] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}>
                                    {systemStats.net > 0 ? activeTab : 'OFFLINE'}
                                </span>
                            </div>
                        </div>
                    </div>

                    { }
                    <div className="absolute right-6 top-0 bottom-0 flex items-center gap-6 no-drag">
                        { }

                        { }

                        { }
                        <div className="h-8 w-[1px] bg-white/[0.15]" />

                        { }
                        <div
                            className="h-full px-4 flex items-center gap-2 border-r border-white/[0.15] cursor-pointer group hover:bg-white/[0.03] transition-colors"
                            onClick={() => setIsNotificationsOpen(true)}
                        >
                            <div className="relative">
                                <Bell size={22} className="text-[#888] group-hover:text-[#F2F2F7] transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                                <div className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#F2F2F7] flex items-center justify-center px-0.5 shadow-[0_0_10px_white]">
                                    <span className="text-[10px] font-bold text-black leading-none">3</span>
                                </div>
                            </div>
                            <span className="text-[16px] font-medium text-[#F2F2F7] w-0 overflow-hidden group-hover:w-[130px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                Notifications
                            </span>
                        </div>

                        { }
                        <div className="h-8 w-[1px] bg-white/[0.15]" />

                        { }
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            <div className="w-7 h-7 rounded-full bg-[#111] border border-white/[0.25] flex items-center justify-center overflow-hidden group-hover:border-[#F2F2F7] transition-all shadow-[0_0_8px_rgba(255,255,255,0.08)]">
                                <img
                                    src={zenthosImg}
                                    className="w-full h-full object-cover opacity-100 transition-opacity"
                                    alt="Profile"
                                />
                            </div>
                            <span className="text-[16px] text-[#bbb] font-medium group-hover:text-[#F2F2F7] transition-colors">
                                My Profile
                            </span>
                        </div>

                        { }
                        <div className="h-8 w-[1px] bg-white/[0.15]" />

                        { }
                        <div className="flex items-center gap-2 px-1.5 h-10 bg-white/[0.03] border border-white/[0.15] rounded-[4px] backdrop-blur-xl shadow-2xl mr-2">
                            <div
                                onClick={() => window.api?.toggleNetwork?.()}
                                onMouseEnter={() => setNetHover(true)}
                                onMouseLeave={() => setNetHover(false)}
                                onMouseMove={handleMouseMove}
                                className="flex items-center justify-center w-9 h-8 rounded-[2px] hover:bg-white/[0.05] transition-all duration-300 group/net cursor-pointer"
                            >
                                <div className="relative">
                                    <Wifi
                                        size={16}
                                        className={`${systemStats.net > 0 ? 'text-[#00FF41]' : 'text-[#FF3B30] animate-pulse'} transition-colors duration-500`}
                                        strokeWidth={2.5}
                                    />
                                    {systemStats.net > 0 && (
                                        <div className="absolute inset-0 bg-[#00FF41] opacity-20 blur-md rounded-full animate-pulse group-hover/net:opacity-40" />
                                    )}
                                </div>
                            </div>

                            { }
                            <div className="w-[1px] h-4 bg-white/20" />

                            <div
                                className="flex items-center gap-1.5 px-2.5 h-8 rounded-[2px] transition-all duration-300 group/time cursor-default"
                            >
                                <Clock
                                    size={12}
                                    className="text-white/60 group-hover/time:text-white/80 transition-colors duration-300"
                                    strokeWidth={2}
                                />
                                <DigitalClock />
                            </div>
                        </div>

                        { }
                        <div className="h-8 w-[1px] bg-white/[0.15]" />

                        <WindowControls onReload={handleSoftReload} />

                        { }
                        <AnimatePresence>
                            {netHover && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    style={{
                                        position: 'fixed',
                                        left: mousePos.x + 12,
                                        top: mousePos.y + 12,
                                        zIndex: 9999,
                                        pointerEvents: 'none'
                                    }}
                                    className="px-3 py-0.5 bg-[#111113] border border-white/10 rounded-[2px] backdrop-blur-md"
                                >
                                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#F2F2F7]/60">
                                        {systemStats.net > 0 ? 'Disconnect' : 'Connect'}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                { }
                <div className={`h-16 w-full flex items-center justify-between px-6 shrink-0 ${searchQuery ? 'z-[100]' : 'z-10'} relative`}>
                    { }
                    <div className="relative w-72 h-9 group" style={{ zIndex: searchQuery ? 9999 : 50 }}>
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-[#F2F2F7] transition-all z-20 pointer-events-none">
                            <Search size={16} strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Location/Camera"
                            className="w-full h-full pl-11 pr-4 bg-[#111113] border border-white/[0.18] rounded-[2px] text-[15px] text-[#F2F2F7] font-medium placeholder-white/30 focus:outline-none focus:border-white/40 focus:shadow-[0_0_15px_rgba(255,255,255,0.04)] transition-all relative z-10"
                        />

                        { }
                        <AnimatePresence>
                            {searchQuery && (() => {
                                const q = searchQuery.toLowerCase();
                                const filtered = allSearchItems.filter(item =>
                                    item.label.toLowerCase().includes(q) ||
                                    item.keywords.toLowerCase().includes(q) ||
                                    item.category.toLowerCase().includes(q)
                                );

                                const grouped = filtered.reduce((acc, item) => {
                                    if (!acc[item.category]) acc[item.category] = []
                                    acc[item.category].push(item)
                                    return acc
                                }, {})

                                return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-[380px] mt-2 rounded-lg overflow-hidden"
                                        style={{ zIndex: 9999, pointerEvents: 'auto' }}
                                    >
                                        <div className="bg-[#111113] border border-white/[0.18] rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden">
                                            <div className="px-4 py-2.5 border-b border-white/[0.18] flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-[#666] tracking-widest uppercase">Results</span>
                                                <span className="text-[10px] text-[#555] font-mono">{filtered.length} found</span>
                                            </div>
                                            <div className="max-h-[420px] overflow-y-auto custom-scrollbar overscroll-contain">
                                                {filtered.length === 0 && (
                                                    <div className="p-8 flex flex-col items-center justify-center gap-3">
                                                        <Search size={22} className="text-[#444]" />
                                                        <span className="text-[12px] text-[#555] font-medium">No results for "{searchQuery}"</span>
                                                    </div>
                                                )}

                                                {Object.entries(grouped).map(([category, items]) => (
                                                    <div key={category}>
                                                        <div className="px-4 py-2 bg-white/[0.02] select-none">
                                                            <span className="text-[10px] font-bold text-[#555] tracking-widest uppercase">{category}</span>
                                                        </div>
                                                        {items.map((item, i) => (
                                                            item.isProfile ? (

                                                                <button
                                                                    key={`${category}-${i}`}
                                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); item.action(); }}
                                                                    className="w-full text-left px-4 py-4 flex items-center gap-4 hover:bg-white/[0.08] cursor-pointer group transition-colors border-b border-white/[0.03] focus:outline-none"
                                                                >
                                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/[0.15] group-hover:border-white/[0.4] transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] shrink-0">
                                                                        <img
                                                                            src={userProfile.image}
                                                                            className="w-full h-full object-cover pointer-events-none"
                                                                            alt="Profile"
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1 flex flex-col gap-0.5 min-w-0 pointer-events-none">
                                                                        <span className="text-[14px] font-semibold text-[#ddd] group-hover:text-white transition-colors truncate">{userProfile.name}</span>
                                                                        <span className="text-[11px] text-[#666] group-hover:text-[#999] transition-colors truncate">{userProfile.email}</span>
                                                                    </div>
                                                                    <ArrowRight size={14} className="text-[#444] group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0 pointer-events-none" />
                                                                </button>
                                                            ) : (

                                                                <button
                                                                    key={`${category}-${i}`}
                                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); item.action(); }}
                                                                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/[0.08] cursor-pointer group border-b border-white/[0.03] last:border-0 transition-colors focus:outline-none"
                                                                >
                                                                    <div className="flex items-center gap-3 pointer-events-none">
                                                                        <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.15] group-hover:border-white/[0.2] group-hover:bg-white/[0.08] transition-all">
                                                                            <item.icon size={14} className="text-[#888] group-hover:text-white transition-colors" />
                                                                        </div>
                                                                        <span className="text-[13px] font-medium text-[#ccc] group-hover:text-white transition-colors">{item.label}</span>
                                                                    </div>
                                                                    <ArrowRight size={14} className="text-[#444] group-hover:text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none" />
                                                                </button>
                                                            )
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })()}
                        </AnimatePresence>
                    </div>

                    { }
                    <div className="flex items-center gap-3">
                        <div className="relative" ref={cameraRef}>
                            <button
                                onClick={() => {
                                    setIsCameraOpen(!isCameraOpen)
                                    setIsLocationOpen(false)
                                }}
                                className={`h-9 px-4 flex items-center gap-2 bg-[#111113] border rounded-[2px] transition-colors text-[15px] font-medium min-w-[140px] justify-between cursor-pointer
                                   ${isCameraOpen ? 'border-white/30 text-[#F2F2F7]' : 'border-white/[0.18] text-[#888] hover:bg-[#111] hover:text-[#F2F2F7]'}
                                `}
                            >
                                <span className="truncate max-w-[120px]">{currentCamera}</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 transition-transform ${isCameraOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                        </div>

                        <button
                            onClick={() => setIsSetupOpen(true)}
                            className="relative group h-9 px-6 border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center gap-2"
                        >
                            <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                            <div className="relative z-10 flex items-center gap-2">
                                <Plus size={14} strokeWidth={4} className="text-black group-hover:text-white transition-colors duration-300" />
                                <span className="text-[12px] font-mono font-bold tracking-wider uppercase text-black group-hover:text-white transition-colors duration-300">
                                    Add camera
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                        </button>
                    </div>
                </div>

                { }
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 p-6 overflow-hidden flex flex-col items-center justify-center`}
                >
                    { }
                    <AnimatePresence>
                        {activeTab === 'Security Cameras' && (
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="w-full mb-6 flex items-center justify-start shrink-0"
                            >
                                <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/[0.15] rounded-[4px] backdrop-blur-md">
                                    {['All', 'Entrance', 'Exit', 'Garage', 'Basement'].map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => setCurrentLocation(loc)}
                                            className={`
                                                px-5 py-2 text-[11px] font-black font-mono tracking-widest uppercase rounded-[2px] transition-all duration-500
                                                ${currentLocation === loc
                                                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                                                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.05]'}
                                            `}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {activeTab === 'Security Cameras' && (
                        <>
                            { }
                            <div className="w-full bg-[#111113] rounded-[4px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative h-[calc(100%-80px)]">
                                { }
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-20 pointer-events-none" />

                                {(currentCamera !== 'All cameras' || currentLocation !== 'All') ? (

                                    <div className="relative w-full h-full bg-void p-2">
                                        { }
                                        <div className="absolute inset-0 opacity-[0.08]"
                                            style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                        />

                                        <motion.div
                                            key={currentCamera !== 'All cameras' ? currentCamera : currentLocation}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-full h-full relative group"
                                        >
                                            {(() => {
                                                const activeId = currentCamera !== 'All cameras' ? currentCamera : currentLocation;
                                                const camImages = {
                                                    'Basement': basementImg,
                                                    'Entrance': entranceImg,
                                                    'Garage': garageImg,
                                                    'Exit': exitImg
                                                };
                                                return (
                                                    <FeedCell
                                                        label={cameraRegistry[activeId]?.label || activeId}
                                                        offline={cameraRegistry[activeId]?.offline}
                                                        alert={cameraRegistry[activeId]?.alert}
                                                        systemNet={systemStats.net}
                                                        image={camImages[activeId]}
                                                    />
                                                );
                                            })()}
                                        </motion.div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full bg-void p-2">
                                        { }
                                        <div className="absolute inset-0 opacity-[0.08]"
                                            style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                        />

                                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 relative z-10">
                                            { }
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Basement'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Basement'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Basement'].label} image={basementImg} offline={cameraRegistry['Basement'].offline} systemNet={gridNetStatus[0]} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111113]/80 hover:bg-white/[0.05] backdrop-blur-md border border-white/[0.18] rounded-[2px] transition-all group-hover/btn:border-white/40 group/btn">
                                                        <Maximize size={10} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 group-hover/btn:text-white uppercase transition-colors">Expand Feed</span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            { }
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Entrance'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Entrance'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Entrance'].label} alert={cameraRegistry['Entrance'].alert} image={entranceImg} offline={cameraRegistry['Entrance'].offline} systemNet={gridNetStatus[1]} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111113]/80 hover:bg-white/[0.05] backdrop-blur-md border border-white/[0.18] rounded-[2px] transition-all group-hover/btn:border-white/40 group/btn">
                                                        <Maximize size={10} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 group-hover/btn:text-white uppercase transition-colors">Expand Feed</span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            { }
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Exit'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Exit'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Exit'].label} image={exitImg} offline={cameraRegistry['Exit'].offline} systemNet={gridNetStatus[2]} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111113]/80 hover:bg-white/[0.05] backdrop-blur-md border border-white/[0.18] rounded-[2px] transition-all group-hover/btn:border-white/40 group/btn">
                                                        <Maximize size={10} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 group-hover/btn:text-white uppercase transition-colors">Expand Feed</span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            { }
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Garage'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Garage'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell
                                                    label={cameraRegistry['Garage'].label}
                                                    image={garageImg}
                                                    offline={cameraRegistry['Garage'].offline}
                                                    systemNet={gridNetStatus[3]}
                                                />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111113]/80 hover:bg-white/[0.05] backdrop-blur-md border border-white/[0.18] rounded-[2px] transition-all group-hover/btn:border-white/40 group/btn">
                                                        <Maximize size={10} className="text-white/70 group-hover/btn:text-white transition-colors" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 group-hover/btn:text-white uppercase transition-colors">Expand Feed</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        { }
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20 pointer-events-none flex items-center justify-center opacity-10">
                                            <div className="w-[2px] h-full bg-white/40" />
                                            <div className="absolute h-[2px] w-full bg-white/40" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    { }
                    {activeTab === 'Primus' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center text-center max-w-lg"
                        >
                            <img src={secCamSvg} className="w-[320px] mb-6 opacity-60 invert select-none pointer-events-none" alt="Camera Setup" />
                            <h2 className="text-[24px] text-[#F2F2F7] font-medium mb-3 tracking-wide">No Camera connected yet.</h2>
                            <p className="text-[#888] text-[15px] mb-10 leading-relaxed font-light">
                                {systemStats.net > 0
                                    ? "Let's set up your first camera for live monitoring"
                                    : "Hardware link lost. Please restore connectivity to provision new devices."}
                            </p>
                            <button
                                onClick={() => {
                                    if (systemStats.net > 0) {
                                        setIsPrimusConnectOpen(true)
                                        setPrimusConnectStep(1)
                                    }
                                }}
                                disabled={systemStats.net === 0}
                                className={`relative group px-8 py-3 bg-transparent border overflow-hidden rounded-[2px] flex items-center gap-4 transition-all duration-500 
                                    ${systemStats.net > 0
                                        ? 'border-white cursor-pointer'
                                        : 'border-white/10 cursor-not-allowed'}`}
                            >
                                { }
                                {systemStats.net > 0 && (
                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                )}

                                { }
                                <div className="relative z-10 flex items-center gap-3">
                                    <span className={`text-[14px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300 
                                        ${systemStats.net > 0 ? 'text-black group-hover:text-white' : 'text-white/20'}`}>
                                        {systemStats.net > 0 ? 'Connect' : 'System Offline'}
                                    </span>
                                    <ArrowRight size={18} className={`transition-all duration-300 
                                        ${systemStats.net > 0 ? 'text-black group-hover:text-white group-hover:translate-x-1' : 'text-white/10'}`} />
                                </div>

                                { }
                                {systemStats.net > 0 && (
                                    <>
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}

                    { }
                    {!['Security Cameras', 'Primus'].includes(activeTab) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center text-center max-w-2xl relative"
                        >
                            { }
                            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]">
                                <img src={teletraanLogo} className="w-[500px] grayscale invert animate-pulse duration-[5s]" alt="" />
                            </div>

                            { }
                            <div className="w-16 h-1 bg-white/20 rounded-full mb-8 relative overflow-hidden">
                                <motion.div
                                    animate={{ x: [-64, 64] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-white/80 blur-[2px]"
                                />
                            </div>

                            <div className="relative mb-10">
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-10 bg-white/5 blur-[60px] rounded-full"
                                />
                                <div className="relative px-8 py-3 border border-white/20 bg-[#111113]/50 backdrop-blur-md rounded-[2px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <span className="text-[11px] font-mono font-bold tracking-[0.4em] uppercase text-white/40 mb-2 block">Restricted Access</span>
                                    <h1 className="text-[42px] font-black text-white tracking-[0.3em] uppercase mb-1 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                        Coming Soon
                                    </h1>
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                </div>

                                { }
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/20" />
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <p className="text-[#888] text-[18px] leading-relaxed max-w-xl font-mono font-bold tracking-[0.15em]">
                                    This interface is currently undergoing development.
                                </p>
                            </div>

                        </motion.div>
                    )}
                </motion.div>

                { }
                <AnimatePresence>
                    {isPrimusConnectOpen && (
                        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 font-sans">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/70 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-xl bg-[#0E0E10] border border-white/[0.15] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl relative overflow-hidden flex flex-col"
                            >
                                { }
                                <div className="h-16 border-b border-white/[0.18] flex items-center justify-between px-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41]" />
                                        <span className="text-white text-[15px] font-medium tracking-wide">Connect Primus</span>
                                    </div>
                                    <button
                                        onClick={() => setIsPrimusConnectOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8">
                                    { }
                                    {primusConnectStep === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center py-10 px-4 text-center"
                                        >
                                            <div className="w-20 h-20 mb-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center relative">
                                                <Wrench size={32} className="text-white" />
                                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                                                    <Settings size={16} strokeWidth={2.5} />
                                                </div>
                                            </div>
                                            <h2 className="text-[24px] font-bold text-white mb-4">Welcome to Teletraan</h2>
                                            <p className="text-[#888] text-[15px] leading-relaxed max-w-sm mb-10">
                                                Before you can start using Teletraan, you need to connect your Primus device. This powers your security alerts, video intelligence, and everything else.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setPrimusConnectStep(2)

                                                    setTimeout(() => {
                                                        setPrimusConnectStep(3)
                                                    }, 2500)
                                                }}
                                                className="relative group px-8 py-3.5 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                            >
                                                <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                <span className="relative z-10 text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                    Connect Primus
                                                </span>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            </button>
                                        </motion.div>
                                    )}

                                    { }
                                    {primusConnectStep === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center py-12"
                                        >
                                            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                                                <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" />
                                                <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin [animation-direction:reverse]" />
                                                <Loader2 size={32} className="text-white animate-spin" />
                                            </div>
                                            <h3 className="text-[16px] font-medium text-white tracking-wide mb-2">Connecting...</h3>
                                            <p className="text-[#666] text-[14px]">Establishing secure connection to device</p>
                                        </motion.div>
                                    )}

                                    { }
                                    {primusConnectStep === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="w-full text-left"
                                        >
                                            <div className="mb-8">
                                                <h2 className="text-[20px] font-medium text-white mb-1">Configure Device</h2>
                                                <p className="text-[#666] text-[14px]">Enter the details for your new Primus unit.</p>
                                            </div>

                                            <div className="flex flex-col gap-5">
                                                { }
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Site Reference</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.site}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, site: e.target.value })}
                                                        placeholder="e.g. Main HQ"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.15] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                { }
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Device Label</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.label}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, label: e.target.value })}
                                                        placeholder="e.g. Camera-01"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.15] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                { }
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Location</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.location}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, location: e.target.value })}
                                                        placeholder="e.g. North Hallway"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.15] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                { }
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Description <span className="opacity-50 font-normal">(Optional)</span></label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.description}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, description: e.target.value })}
                                                        placeholder="e.g. Monitoring main entrance"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.15] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                <div className="mt-4 pt-6">
                                                    <button
                                                        onClick={() => setPrimusConnectStep(4)}
                                                        className="w-full h-12 relative group border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center justify-center"
                                                    >
                                                        <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                        <div className="relative z-10 flex items-center gap-3">
                                                            <span className="text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                                Connect
                                                            </span>
                                                            <ArrowRight size={18} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                                        </div>
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    { }
                                    {primusConnectStep === 4 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center py-10"
                                        >
                                            <div className="w-20 h-20 mb-6 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center">
                                                <Users size={32} className="text-[#00FF41]" />
                                            </div>
                                            <h2 className="text-[22px] font-bold text-white mb-2">Connected</h2>
                                            <p className="text-[#888] text-[15px] mb-8 text-center max-w-xs leading-relaxed">
                                                Primus is now active and successfully monitoring the grid.
                                            </p>
                                            <button
                                                onClick={() => setIsPrimusConnectOpen(false)}
                                                className="relative group w-full max-w-[200px] h-11 border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center justify-center"
                                            >
                                                <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                <span className="relative z-10 text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                    Continue
                                                </span>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                { }
                <AnimatePresence>
                    {isProfileOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/30 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={() => setActiveEditField(null)}
                                className="w-full max-w-4xl bg-[#111113]/80 backdrop-blur-3xl border border-white/[0.15] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
                            >
                                { }
                                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-70 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />

                                { }
                                <div className="px-10 py-8 flex items-center justify-between border-b border-white/[0.18] bg-white/[0.01]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-6 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-[24px] font-bold text-[#F2F2F7] tracking-[0.15em] uppercase leading-none">Profile Settings</h2>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsProfileOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            { }
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                { }
                                <div className="p-10 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-10">

                                    { }
                                    <div className="flex items-center gap-10">
                                        { }
                                        <div className="relative group cursor-pointer shrink-0">
                                            <div className="w-40 h-40 rounded-full border-[3px] border-white/10 p-1.5 group-hover:border-[#00FF41]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                                <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative">
                                                    {userProfile.image ? (
                                                        <img src={userProfile.image} className="w-full h-full object-cover" alt="Profile" />
                                                    ) : (
                                                        <Users size={48} className="text-[#333]" />
                                                    )}
                                                    <div className="absolute inset-0 bg-[#111113]/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                                                        <RefreshCw size={24} className="text-[#00FF41] mb-2" />
                                                        <span className="text-[10px] font-bold text-[#F2F2F7] uppercase tracking-widest">Update</span>
                                                    </div>
                                                </div>
                                            </div>
                                            { }
                                            <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#00FF41] rounded-full border-[4px] border-[#111113] shadow-[0_0_15px_#00FF41]" />
                                        </div>

                                        { }
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-4xl font-bold text-[#F2F2F7] tracking-[0.05em] uppercase">{userProfile.name}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded text-[#00FF41] text-xs font-bold tracking-widest uppercase">
                                                    System Administrator
                                                </span>
                                            </div>
                                            <p className="text-[#888] text-sm leading-relaxed max-w-lg pt-2">
                                                Main administrator with full access to security feeds, system settings, and device configurations.
                                            </p>
                                        </div>
                                    </div>

                                    { }
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                        { }
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#DDDDDD] font-bold tracking-[0.2em] uppercase pl-1">Name</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    value={userProfile.name}
                                                    readOnly={activeEditField !== 'name'}
                                                    ref={nameInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, name: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'name'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.15] text-[#CCCCCC] hover:border-white/20'}
                                                    `}
                                                />
                                                { }
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'name' ? null : 'name')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'name' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        { }
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#DDDDDD] font-bold tracking-[0.2em] uppercase pl-1">Email</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="email"
                                                    value={userProfile.email}
                                                    readOnly={activeEditField !== 'email'}
                                                    ref={emailInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, email: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'email'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.15] text-[#CCCCCC] hover:border-white/20'}
                                                    `}
                                                />
                                                { }
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'email' ? null : 'email')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'email' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        { }
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#DDDDDD] font-bold tracking-[0.2em] uppercase pl-1">Password</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="password"
                                                    value={userProfile.securityKey || '............'}
                                                    placeholder="••••••••••••"
                                                    readOnly={activeEditField !== 'securityKey'}
                                                    ref={securityKeyInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, securityKey: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] pl-5 pr-32 text-2xl font-bold tracking-widest focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'securityKey'
                                                            ? 'border-[#00FF41] text-white bg-[#00FF41]/[0.05] shadow-[0_0_20px_rgba(0,255,65,0.25)] scale-[1.01]'
                                                            : 'border-white/[0.15] text-[#F2F2F7] group-hover:border-[#00FF41]/50'}
                                                    `}
                                                />
                                                { }
                                                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-[#00FF41]/30" />
                                                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-[#00FF41]/30" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'securityKey' ? null : 'securityKey')
                                                    }}
                                                    className={`absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 border rounded-[2px] text-[10px] font-bold tracking-[0.15em] transition-all duration-300
                                                        ${activeEditField === 'securityKey'
                                                            ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/20'
                                                            : 'bg-white/[0.02] border-white/[0.15] text-[#666] hover:text-[#F2F2F7] hover:border-white/[0.2] hover:bg-white/[0.05]'}
                                                    `}
                                                >
                                                    {activeEditField === 'securityKey' ? 'SAVE' : 'RESET'}
                                                </button>
                                            </div>
                                        </div>

                                        { }
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#DDDDDD] font-bold tracking-[0.2em] uppercase pl-1">Contact</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    value={userProfile.phone}
                                                    readOnly={activeEditField !== 'phone'}
                                                    ref={phoneInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, phone: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'phone'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.15] text-[#CCCCCC] hover:border-white/20'}
                                                    `}
                                                />
                                                { }
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'phone' ? null : 'phone')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'phone' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                { }
                                <div className="px-10 py-6 border-t border-white/[0.18] bg-transparent flex justify-end">
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            setIsLogoutModalOpen(true);
                                        }}
                                        className="group relative px-8 py-3 bg-[#C43E3E] hover:bg-[#FF3B30] border border-[#C43E3E] hover:border-[#FF3B30] rounded-[6px] transition-all duration-300 overflow-hidden hover:shadow-[0_0_20px_rgba(255,59,48,0.5)] hover:scale-[1.02]"
                                    >
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.1)_5px,rgba(0,0,0,0.1)_10px)] opacity-50" />
                                        <div className="flex items-center gap-3 relative z-10">
                                            <LogOut size={16} className="text-white group-hover:scale-110 transition-transform duration-300" />
                                            <span className="text-[12px] font-bold text-white tracking-[0.2em] uppercase">Terminate Session</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isLocationOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/50 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl bg-[#111113]/80 backdrop-blur-3xl border border-white/[0.15] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-20" />

                                <div className="px-8 py-6 border-b border-white/[0.18] flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                                        <h2 className="text-[20px] font-bold text-[#F2F2F7] tracking-[0.2em] uppercase">Select Location</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsLocationOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {locations.map((loc) => {
                                        const Icon = loc === 'Living Room' ? Sofa
                                            : loc === 'Front Door' ? DoorOpen
                                                : loc === 'Backyard' ? TreePine
                                                    : loc === 'Garage' ? Car
                                                        : loc === 'Kitchen' ? Utensils
                                                            : MapPin

                                        return (
                                            <button
                                                key={loc}
                                                onClick={() => {
                                                    setCurrentLocation(loc)
                                                    setIsLocationOpen(false)
                                                    if (loc !== 'All') {
                                                        setCurrentCamera('All cameras')
                                                    }
                                                }}
                                                className={`relative group w-full aspect-video bg-[#111113] border border-white/[0.15] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                                                ${currentLocation === loc ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                            `}
                                            >
                                                { }
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                                <div className={`relative z-10 p-4 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30
                                                ${currentLocation === loc ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                            `}>
                                                    <Icon size={24} strokeWidth={1.5} />
                                                </div>

                                                { }
                                                <div className="absolute bottom-4 opacity-100 transition-all duration-300 transform translate-y-0">
                                                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#F2F2F7] uppercase bg-[#111113]/90 px-3 py-1 border border-white/10 rounded-[2px] backdrop-blur-md">
                                                        {loc}
                                                    </span>
                                                </div>

                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isCameraOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/50 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl bg-[#111113]/80 backdrop-blur-3xl border border-white/[0.15] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-20" />

                                <div className="px-8 py-6 border-b border-white/[0.18] flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-white rounded-full shadow-[0_0_15px_white]" />
                                        <h2 className="text-[20px] font-bold text-[#F2F2F7] tracking-[0.2em] uppercase">Select Feed</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsCameraOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {cameras.map((cam) => (
                                        <button
                                            key={cam}
                                            onClick={() => {
                                                setCurrentCamera(cam)
                                                setIsCameraOpen(false)
                                                if (cam !== 'All cameras') setCurrentLocation('All')
                                            }}
                                            className={`relative group w-full aspect-video bg-[#111113] border border-white/[0.15] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                                                ${currentCamera === cam ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                            `}
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                            <div className={`relative z-10 p-4 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30
                                                ${currentCamera === cam ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                            `}>
                                                {cam === 'All cameras' ? (
                                                    <Video size={24} />
                                                ) : (
                                                    <div className="relative w-6 h-6 flex items-center justify-center">
                                                        { }
                                                        <div className="absolute inset-[-6px] border border-current rounded-full opacity-20 border-t-transparent border-l-transparent animate-[spin_4s_linear_infinite]" />
                                                        <div className="absolute inset-[-6px] border border-current rounded-full opacity-10 border-b-transparent border-r-transparent animate-[spin_4s_linear_infinite_reverse]" />

                                                        { }
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full relative z-10">
                                                            <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
                                                            <circle cx="12" cy="12" r="4" />
                                                            <path d="M12 2v2" />
                                                            <path d="M12 20v2" />
                                                            <path d="M2 12h2" />
                                                            <path d="M20 12h2" />
                                                            <path d="M7 7l1.5 1.5" />
                                                            <path d="M17 7l-1.5 1.5" />
                                                            <path d="M7 17l1.5-1.5" />
                                                            <path d="M17 17l-1.5-1.5" />
                                                        </svg>

                                                        { }
                                                        <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-500" />
                                                        <div className="absolute w-1.5 h-1.5 bg-current rounded-full" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute bottom-4 opacity-100 transition-all duration-300 transform translate-y-0">
                                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#F2F2F7] uppercase bg-[#111113]/90 px-3 py-1 border border-white/10 rounded-[2px] backdrop-blur-md">
                                                    {cam}
                                                </span>
                                            </div>

                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }

                { }
                <AnimatePresence>
                    {isSetupOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/50 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-5xl bg-[#111113]/80 backdrop-blur-3xl border border-white/[0.15] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-3xl relative overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                { }
                                <div className="px-12 py-8 border-b border-white/[0.15] flex justify-between items-center bg-white/[0.01]">
                                    <div>
                                        <h2 className="text-3xl font-bold text-[#F2F2F7] tracking-[0.1em] uppercase drop-shadow-lg">Device Integration</h2>
                                        <p className="text-[#666] text-sm tracking-widest mt-2 uppercase font-medium">Configure New Hardware Nodes</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsSetupOpen(false)
                                            setSetupMethod(null)
                                            setSetupStep(1)
                                        }}
                                        className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={24} className="group-hover:scale-110 transition-transform" />
                                            { }
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-12 overflow-y-auto custom-scrollbar">
                                    { }
                                    {setupStep === 1 && (
                                        <div className="grid grid-cols-2 gap-8">
                                            { }
                                            <button
                                                disabled
                                                className="relative group w-full aspect-video bg-[#111113] border border-white/[0.04] flex flex-col items-center justify-center overflow-hidden opacity-50 cursor-not-allowed"
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[size:20px_20px]" />
                                                <div className="relative z-10 p-5 border border-white/10 rounded-full bg-white/[0.02] mb-4">
                                                    <Radio size={32} className="text-[#666]" />
                                                </div>
                                                <span className="text-[12px] font-bold tracking-[0.2em] text-[#666] uppercase">Smart Setup</span>
                                                <div className="absolute top-4 right-4 px-2 py-1 bg-white/5 border border-white/10 text-[8px] text-[#666] font-bold uppercase tracking-wider rounded">
                                                    Unavailable
                                                </div>
                                            </button>

                                            { }
                                            <button
                                                onClick={() => setSetupMethod('manual')}
                                                className={`relative group w-full aspect-video bg-[#111113] border border-white/[0.15] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden cursor-pointer
                                                    ${setupMethod === 'manual' ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                                `}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                                <div className={`relative z-10 p-5 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30 mb-4
                                                    ${setupMethod === 'manual' ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                                `}>
                                                    <Settings size={32} strokeWidth={1.5} />
                                                </div>

                                                <span className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-colors ${setupMethod === 'manual' ? 'text-[#F2F2F7]' : 'text-[#888] group-hover:text-[#F2F2F7]'}`}>
                                                    Manual Setup
                                                </span>

                                                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                            </button>
                                        </div>
                                    )}

                                    { }
                                    {setupStep === 2 && (
                                        <div className="flex flex-col gap-6 p-2">

                                            { }
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Device Type</label>
                                                <div className="relative group z-50">
                                                    <button
                                                        onClick={() => setIsDeviceTypeOpen(!isDeviceTypeOpen)}
                                                        className={`w-full h-12 bg-[#111113] border rounded-[2px] px-4 flex items-center justify-between text-sm text-[#F2F2F7] transition-all outline-none
                                                            ${isDeviceTypeOpen ? 'border-[#F2F2F7] shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/[0.15] hover:border-[#F2F2F7]/50'}
                                                        `}
                                                    >
                                                        <span className={deviceType === 'Select Hardware...' ? 'text-[#444]' : 'text-[#F2F2F7]'}>
                                                            {deviceType}
                                                        </span>
                                                        <ChevronDown size={14} className={`text-[#666] transition-transform duration-300 ${isDeviceTypeOpen ? 'rotate-180 text-[#F2F2F7]' : ''}`} />
                                                    </button>

                                                    { }
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />

                                                    { }
                                                    <AnimatePresence>
                                                        {isDeviceTypeOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 5 }}
                                                                transition={{ duration: 0.1 }}
                                                                className="absolute top-full left-0 right-0 mt-1 bg-[#111113] border border-white/[0.15] rounded-[2px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                                                            >
                                                                {["Select Hardware...", "IP Camera", "NVR / DVR System"].map((option, i) => (
                                                                    <div
                                                                        key={i}
                                                                        onClick={() => {
                                                                            setDeviceType(option)
                                                                            setIsDeviceTypeOpen(false)
                                                                        }}
                                                                        className={`px-4 py-3 text-[13px] cursor-pointer transition-colors flex items-center justify-between group
                                                                            ${deviceType === option ? 'bg-white/[0.08] text-[#F2F2F7]' : 'text-[#888] hover:bg-white/[0.04] hover:text-[#F2F2F7]'}
                                                                        `}
                                                                    >
                                                                        {option}
                                                                        {deviceType === option && <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />}
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">IP Address</label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="192.168.1.X" className="w-full h-12 bg-[#111113] border border-white/[0.15] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Username <span className="text-[#333] ml-2">(OPTIONAL)</span></label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="admin" className="w-full h-12 bg-[#111113] border border-white/[0.15] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Device Name</label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="e.g. Hallway Cam" className="w-full h-12 bg-[#111113] border border-white/[0.15] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            { }
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Port</label>
                                                    <div className="relative group">
                                                        <input type="text" placeholder="8080" className="w-full h-12 bg-[#111113] border border-white/[0.15] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Password <span className="text-[#333] ml-2">(OPTIONAL)</span></label>
                                                    <div className="relative group">
                                                        <input type="password" placeholder="••••••••" className="w-full h-12 bg-[#111113] border border-white/[0.15] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    className="relative group w-full h-14 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                                >
                                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                                        <span className="text-black group-hover:text-white text-[12px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300">
                                                            Connect Camera
                                                        </span>
                                                        <ArrowRight size={14} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                { }
                                {setupStep === 1 && setupMethod === 'manual' && (
                                    <div className="p-8 border-t border-white/[0.18] flex justify-end bg-[#111113]/30">
                                        <button
                                            onClick={() => setSetupStep(2)}
                                            className="relative group h-14 px-10 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                            <span className="relative z-10 text-black group-hover:text-white text-[12px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300">
                                                Proceed to Config
                                            </span>
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isNotificationsOpen && (
                        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/70 backdrop-blur-[60px]"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 20 }}
                                className="w-full max-w-6xl h-[85vh] bg-[#111113] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-[4px] relative overflow-hidden flex flex-col"
                            >
                                { }
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_20px_white]" />

                                { }
                                <div className="h-24 border-b border-white/[0.15] flex items-center justify-between px-10 bg-white/[0.02]">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[22px] font-bold text-white tracking-[0.25em] uppercase drop-shadow-md">Notifications Hub</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsNotificationsOpen(false)}
                                        className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group relative ml-4"
                                    >
                                        <div className="relative p-2">
                                            <X size={24} className="group-hover:scale-110 transition-transform" />
                                            { }
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="flex-1 flex overflow-hidden">
                                    { }
                                    <div className="w-[300px] border-r border-white/[0.15] flex flex-col py-6 bg-[#111113]/50">
                                        {Object.keys(notificationGroups).map((tabKey) => {
                                            const isActive = activeNotificationTab === tabKey
                                            const latestMsg = notificationGroups[tabKey][notificationGroups[tabKey].length - 1]

                                            return (
                                                <button
                                                    key={tabKey}
                                                    onClick={() => setActiveNotificationTab(tabKey)}
                                                    className={`w-full px-6 py-6 flex items-center gap-4 transition-all duration-300 relative group
                                                        ${isActive ? 'bg-white/[0.05] border-y border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]' : 'hover:bg-white/[0.02] border-y border-transparent'}
                                                    `}
                                                >
                                                    { }
                                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white shadow-[0_0_10px_white]" />}

                                                    <div className="flex flex-col items-start overflow-hidden justify-center flex-1">
                                                        <span className={`text-[13px] font-bold tracking-[0.2em] uppercase transition-colors
                                                            ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}
                                                        `}>{tabKey}</span>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>

                                    { }
                                    <div className="flex-1 flex flex-col bg-[#111113]/30 relative">
                                        { }
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                                        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar relative z-10 flex flex-col gap-8">
                                            {notificationGroups[activeNotificationTab]?.map((msg) => {
                                                const isUser = msg.type === 'outbound'
                                                return (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        key={msg.id}
                                                        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-2`}
                                                    >
                                                        <div className="flex items-center gap-3 px-1 mb-1">
                                                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] font-black">{msg.sender}</span>
                                                            <div className="w-1 h-1 rounded-full bg-white/20" />
                                                            <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{msg.time}</span>
                                                        </div>

                                                        <div className={`max-w-[80%] p-6 rounded-[2px] border transition-all duration-500
                                                            ${isUser
                                                                ? 'bg-white/[0.08] border-white/30 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                                                                : 'bg-[#111113] border-white/10 text-white/90 group-hover:border-white/20'
                                                            }
                                                        `}>
                                                            <p className="text-[14px] leading-relaxed tracking-wider font-sans font-medium">
                                                                {msg.text}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>

                                        { }
                                        <div className="h-16 border-t border-white/[0.15] bg-white/[0.02] flex items-center justify-center px-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                <span className="text-[9px] font-mono text-white/30 tracking-[0.5em] uppercase underline decoration-white/10 underline-offset-4">READ-ONLY SECURE HANDOFF MODE ACTIVE</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isCameraDetailOpen && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 sm:p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/70 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full max-w-7xl h-[85vh] bg-[#111113] border border-[#F2F2F7]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl flex flex-col overflow-hidden relative z-10"
                            >
                                { }
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-50 shadow-[0_0_15px_white]" />

                                { }
                                <div className="h-24 px-10 flex items-center justify-between border-b border-white/[0.15] bg-white/[0.02] shrink-0">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-[28px] font-bold text-[#F2F2F7] tracking-[0.15em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{activeGridCamera || 'Living Room'}</h2>
                                            { }
                                            {(() => {
                                                const cam = cameraRegistry[activeGridCamera || 'Living Room']
                                                const isOffline = cam?.offline || systemStats.net === 0
                                                const isAlert = cam?.alert

                                                return (
                                                    <div className={`flex items-center gap-2 px-2.5 py-1 ${isOffline ? 'bg-white/5 border-white/10' : (isAlert ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/10 border-white/30')} border rounded-[2px] shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                                                        <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-white/20' : (isAlert ? 'bg-orange-500 animate-pulse' : 'bg-white animate-pulse shadow-[0_0_8px_white]')}`} />
                                                        <span className={`text-[11px] font-bold tracking-widest uppercase ${isOffline ? 'text-white/40' : (isAlert ? 'text-orange-500' : 'text-white')}`}>
                                                            {systemStats.net === 0 ? 'SCANNING' : (isOffline ? 'OFFLINE' : 'LIVE FEED')}
                                                        </span>
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <button className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/[0.15] border border-white/[0.15] hover:border-white/30 text-[#F2F2F7] text-[12px] font-bold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group">
                                                <Edit2 size={14} className="group-hover:text-[#F2F2F7] transition-colors" />
                                                Config
                                            </button>
                                            {(cameraRegistry[activeGridCamera || 'Living Room']?.offline || systemStats.net === 0) ? (
                                                <button
                                                    onClick={() => toggleCameraConnection(activeGridCamera || 'Living Room')}
                                                    className="px-6 py-2.5 bg-[#00FF41] hover:bg-[#00FF41]/80 border border-[#00FF41] text-[#FFFFFF] hover:text-[#FFFFFF] text-[12px] font-extrabold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group [text-shadow:0_0_12px_rgba(255,255,255,1)]"
                                                >
                                                    <Link size={14} className="group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,1)]" />
                                                    <span>Connect</span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => toggleCameraConnection(activeGridCamera || 'Living Room')}
                                                    className="px-6 py-2.5 bg-[#FF3B30] hover:bg-[#FF3B30]/80 border border-[#FF3B30] text-[#FFFFFF] text-[12px] font-bold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group [text-shadow:0_0_12px_rgba(255,255,255,1)]"
                                                >
                                                    <LogOut size={14} className="drop-shadow-[0_0_8px_rgba(255,255,255,1)]" />
                                                    <span>Disconnect</span>
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setIsCameraDetailOpen(false)}
                                            className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group relative ml-4"
                                        >
                                            <div className="relative p-2">
                                                <X size={24} className="group-hover:scale-110 transition-transform" />
                                                { }
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                { }
                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0E0E10]">
                                    <div className="p-10 flex flex-col gap-8">

                                        { }
                                        <div
                                            id="camera-full-view"
                                            className="relative w-full aspect-video bg-[#111113] rounded-[4px] border border-white/10 overflow-hidden group shadow-2xl"
                                        >
                                            { }
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

                                            { }
                                            {(() => {
                                                const camImages = {
                                                    'Basement': basementImg,
                                                    'Entrance': entranceImg,
                                                    'Garage': garageImg,
                                                    'Exit': exitImg
                                                }
                                                const activeImg = camImages[activeGridCamera]
                                                if (activeImg) {
                                                    return (
                                                        <div className="absolute inset-0 z-0 pointer-events-none">
                                                            <img src={activeImg} className="w-full h-full object-cover" alt="Feed" />
                                                        </div>
                                                    )
                                                }
                                                return null
                                            })()}

                                            { }

                                            { }
                                            <div className="absolute inset-0 z-10">
                                                {(() => {
                                                    const cam = cameraRegistry[activeGridCamera || 'Living Room']
                                                    const isOffline = cam?.offline || systemStats.net === 0

                                                    if (isOffline) {
                                                        return (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#111113]/50 backdrop-blur-sm">
                                                                <WifiOff size={48} className="text-red-500/40 animate-pulse" />
                                                                <h3 className="text-[20px] font-mono font-black tracking-[0.4em] uppercase text-red-500">SIGNAL_LOST</h3>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                { }
                                                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                                                    <div className="flex items-center gap-2 px-2 py-0.5 bg-red-600 rounded-[1px] animate-pulse">
                                                                        <span className="text-[9px] font-mono font-black text-white uppercase tracking-tighter">LIVE</span>
                                                                    </div>
                                                                    <div className="w-[1px] h-3 bg-white/20" />
                                                                    <span className="text-[11px] font-mono font-black text-white tracking-[0.2em] uppercase">{activeGridCamera || 'CAM_01'}</span>
                                                                </div>

                                                                { }
                                                                <div className="absolute bottom-6 right-6 flex items-center justify-center">
                                                                    { }
                                                                    <div
                                                                        className="flex items-center justify-center w-11 h-11 bg-[#111113]/70 backdrop-blur-md rounded-lg border border-white/20 hover:border-white/50 hover:bg-[#111113]/90 cursor-pointer transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] group/expand"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleFullscreen();
                                                                        }}
                                                                    >
                                                                        <Maximize
                                                                            size={22}
                                                                            className={`${isFullscreen ? 'text-white' : 'text-white/80'} transition-all group-hover/expand:text-white group-hover/expand:scale-110 active:scale-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]`}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                { }
                                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-10">
                                                                    <div className="w-full h-[1px] bg-white absolute top-1/2" />
                                                                    <div className="h-full w-[1px] bg-white absolute left-1/2" />
                                                                </div>

                                                                { }
                                                                {cam?.alert && <div className="absolute inset-0 border-[4px] border-red-500/80 bg-red-500/20 shadow-[inset_0_0_150px_rgba(239,68,68,0.5)] animate-pulse z-20 pointer-events-none" />}
                                                            </>
                                                        )
                                                    }
                                                })()}
                                            </div>

                                            { }
                                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#F2F2F7]/30" />
                                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F2F2F7]/30" />
                                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#F2F2F7]/30" />
                                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#F2F2F7]/30" />
                                        </div>

                                        { }
                                        <div className="mt-8 flex flex-col gap-8 pb-10">
                                            <div className="flex items-center justify-between border-b border-white/[0.15] pb-4 px-2">
                                                <h3 className="text-[18px] font-bold text-[#F2F2F7] tracking-[0.1em] uppercase drop-shadow-md">
                                                    ALERT HISTORY
                                                </h3>
                                            </div>

                                            { }
                                            <div className="flex flex-col gap-4">
                                                <span className="text-[11px] font-bold text-[#666] tracking-[0.1em] uppercase pl-1">May 27, 2026</span>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    { }
                                                    <div className="relative flex items-center justify-between p-5 bg-[#111113] border border-white/[0.15] hover:border-white/[0.2] transition-all duration-300 rounded-xl group cursor-pointer h-24 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.15] rounded-lg text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <AlertTriangle size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Motion Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    - 3 mins ago
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    { }
                                                    <div className="relative flex items-center justify-between p-5 bg-[#111113] border border-white/[0.15] hover:border-white/[0.2] transition-all duration-300 rounded-xl group cursor-pointer h-24 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.15] rounded-lg text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <ScanFace size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Unknown Face Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    12:15 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            { }
                                            <div className="flex flex-col gap-4">
                                                <span className="text-[11px] font-bold text-[#666] tracking-[0.1em] uppercase pl-1">May 04, 2026</span>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    { }
                                                    <div className="relative flex items-center justify-between p-5 bg-[#111113] border border-white/[0.15] hover:border-white/[0.2] transition-all duration-300 rounded-xl group cursor-pointer h-24 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.15] rounded-lg text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <DoorOpen size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Door Forced Open</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    10:00 AM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    { }
                                                    <div className="relative flex items-center justify-between p-5 bg-[#111113] border border-white/[0.15] hover:border-white/[0.2] transition-all duration-300 rounded-xl group cursor-pointer h-24 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.15] rounded-lg text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <DoorOpen size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Door Forced Open</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    10:00 AM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    { }
                                                    <div className="relative flex items-center justify-between p-5 bg-[#111113] border border-white/[0.15] hover:border-white/[0.2] transition-all duration-300 rounded-xl group cursor-pointer h-24 overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.15] rounded-lg text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <AlertTriangle size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Motion Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    3:00 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isLogoutModalOpen && (
                        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#111113]/40 backdrop-blur-[6px]"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                className="w-full max-w-[420px] bg-[#1A1A1A] border border-white/[0.15] rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative z-10 overflow-hidden"
                            >
                                { }
                                <div className="px-8 pt-10 pb-6 text-center">
                                    <h3 className="text-[20px] font-semibold text-white mb-4">Are you sure you want to Log Out?</h3>
                                    <p className="text-[14px] text-[#999] leading-relaxed">
                                        You're about to log out of your account.
                                    </p>
                                    <p className="text-[14px] text-[#999] leading-relaxed">
                                        Make sure you've completed all ongoing activities.
                                    </p>
                                </div>

                                { }
                                <div className="px-8 pb-8 flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => setIsLogoutModalOpen(false)}
                                        className="px-6 py-2.5 text-[14px] font-semibold text-white border border-white/[0.2] hover:border-white/[0.4] hover:bg-white/[0.05] rounded-lg transition-all duration-200"
                                    >
                                        Stay Logged In
                                    </button>
                                    <button
                                        onClick={onLogout}
                                        className="px-6 py-2.5 text-[14px] font-semibold text-white bg-[#E53935] hover:bg-[#C62828] rounded-lg transition-all duration-200"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                { }
                <AnimatePresence>
                    {isReloading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#111113]/50 backdrop-blur-[40px]"
                        >
                            <motion.div className="relative z-10 flex items-center justify-center">
                                <motion.img
                                    layoutId="unified-logo"
                                    src={teletraanLogo}
                                    className="w-[240px] h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px) grayscale(100%)' }}
                                    animate={{ opacity: 0.4, scale: 0.95, filter: 'blur(6px) grayscale(100%)' }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeOut",
                                        layout: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                                    }}
                                    alt="Teletraan Spectral Logo"
                                />
                            </motion.div>

                            { }
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                                <span className="text-white text-[11px] font-mono font-black tracking-[0.5em] uppercase animate-pulse">
                                    SYSTEM LOADING... PLEASE WAIT
                                </span>
                                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-white/40"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    )
}

export default Dashboard
