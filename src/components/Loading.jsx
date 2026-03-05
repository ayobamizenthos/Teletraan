import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import teletraanLogo from '../assets/teletraan.svg'
import dmIcon from '../assets/dm.svg'
import AnimatedLogo from './AnimatedLogo'

const Loading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const startTime = Date.now()
        const duration = 8000

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const nextProgress = Math.min((elapsedTime / duration) * 100, 100)
            setProgress(nextProgress)

            if (nextProgress >= 100) {
                clearInterval(interval)

                setTimeout(() => {
                    onComplete?.();
                }, 100);
            }
        }, 30)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className="fixed inset-0 bg-[#030303] flex items-center justify-center z-[200] overflow-hidden">
            <div className="absolute inset-0 bg-[#030303]" />
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '120px 120px'
                }}
            />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-30%] left-[-30%] w-[160%] h-[60%] bg-gradient-to-b from-white/[0.05] to-transparent skew-y-[-10deg] blur-[150px]" />
                <div className="absolute bottom-[-30%] right-[-30%] w-[160%] h-[60%] bg-gradient-to-t from-white/[0.05] to-transparent skew-y-[-10deg] blur-[150px]" />
            </div>

            <div className="relative z-100 flex items-center justify-center">
                <motion.img
                    layoutId="unified-logo"
                    src={teletraanLogo}
                    className="w-[420px] h-auto object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.25)]"
                    initial={{ opacity: 0, scale: 0.85, filter: 'blur(40px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(30px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
                    transition={{
                        duration: 2.2,
                        ease: [0.22, 1, 0.36, 1],
                        layout: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                    }}
                    alt="Teletraan OS"
                />
            </div>


            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-[72%] w-full max-w-md flex flex-col items-center px-12"
            >
                <div className="relative w-full flex items-center mb-14">
                    <div className="relative w-full h-[1.5px] bg-white/10">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_#ffffff,0_0_35px_rgba(255,255,255,0.4)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="absolute h-[1px] inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                            style={{ left: `${progress}%` }}
                        >
                            <img
                                src={dmIcon}
                                className="w-10 h-10 text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.7)] brightness-[3]"
                                alt="Tactical Link"
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="h-6 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={progress < 33 ? 'm1' : progress < 66 ? 'm2' : 'm3'}
                            initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="text-[11px] font-mono font-black text-white tracking-[0.6em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                        >
                            {progress < 33 ? 'Smart Monitoring' : progress < 66 ? 'Uncompromised Security' : 'Seamless Integration'}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,1)_100%)] pointer-events-none z-50" />
        </div>

    )
}

export default Loading
