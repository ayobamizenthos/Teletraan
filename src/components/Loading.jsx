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
        <div className="fixed inset-0 bg-void flex flex-col items-center justify-center z-[200] overflow-hidden">

            {}
            <div className="absolute inset-0 bg-void" />

            {}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[40%] bg-gradient-to-b from-white/[0.04] to-transparent skew-y-[-15deg]" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[40%] bg-gradient-to-t from-white/[0.04] to-transparent skew-y-[-15deg]" />
            </div>

            {}
            <div className="relative z-30 flex flex-col items-center w-full max-w-5xl">

                <div className="relative mb-16 flex items-center justify-center">

                    {}
                    <div className="relative z-[100] flex items-center justify-center">
                        <motion.img
                            layoutId="unified-logo"
                            src={teletraanLogo}
                            className="w-[240px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4 } }}
                            transition={{
                                layout: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                                default: { duration: 1.5, ease: "easeOut" }
                            }}
                            alt="Teletraan"
                        />
                    </div>

                </div>

                {}
                <motion.div
                    exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.5 } }}
                    className="w-full max-w-sm flex flex-col items-center"
                >

                    {}
                    <div className="relative w-full flex items-center mb-10">
                        {}
                        <div className="relative w-full h-[4px] bg-white/[0.05] rounded-full">
                            {}
                            <div className="absolute inset-0 bg-white/[0.02] blur-[1px]" />

                            {}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                style={{ left: `${progress}%` }}
                            >
                                <img
                                    src={dmIcon}
                                    className="w-9 h-9 text-white drop-shadow-[0_0_30px_white] filter brightness-[3]"
                                    alt="Link"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {}
                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={progress < 33 ? 'm1' : progress < 66 ? 'm2' : 'm3'}
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-[12px] font-mono text-white tracking-[0.4em] uppercase whitespace-nowrap"
                            >
                                {progress < 33 ? 'Smart Monitoring' : progress < 66 ? 'Uncompromised Security' : 'Seamless Integration'}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.95)_100%)] pointer-events-none z-50" />
        </div>
    )
}

export default Loading
