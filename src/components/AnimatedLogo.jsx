import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ className }) => (
<svg className={className} viewBox="15 15 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        {/**/}
        {/**/}
        <linearGradient id="titanium_base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#E1E1E6" />
            <stop offset="45%" stopColor="#8E8E93" />
            <stop offset="70%" stopColor="#48484A" />
            <stop offset="90%" stopColor="#2C2C2E" />
            <stop offset="100%" stopColor="#1A1A1E" />
        </linearGradient>

        {/**/}
        <filter id="hard_machined_metal" x="-20%" y="-20%" width="140%" height="140%">
            {/**/}
            <feComponentTransfer in="SourceGraphic" result="base" />
            
            {/**/}
            <feTurbulence type="fractalNoise" baseFrequency="0.015 1.5" numOctaves="3" result="noise" />
            {/**/}
            <feColorMatrix type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0.25" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="base" result="grain" />
            <feBlend mode="overlay" in="grain" in2="base" result="brushed" />

            {/**/}
            <feOffset dx="-0.8" dy="-0.8" in="SourceAlpha" result="offsetHighlight" />
            <feComposite operator="out" in="SourceAlpha" in2="offsetHighlight" result="highlightMask" />
            <feFlood floodColor="#FFFFFF" floodOpacity="0.9" result="highlightColor" />
            <feComposite operator="in" in="highlightColor" in2="highlightMask" result="highlight" />

            {/**/}
            <feOffset dx="1.2" dy="1.2" in="SourceAlpha" result="offsetShadow" />
            <feComposite operator="out" in="SourceAlpha" in2="offsetShadow" result="shadowMask" />
            <feFlood floodColor="#050505" floodOpacity="0.95" result="shadowColor" />
            <feComposite operator="in" in="shadowColor" in2="shadowMask" result="shadow" />

            {/**/}
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.95" result="dropShadow" />

            {/**/}
            <feMerge>
                <feMergeNode in="dropShadow" />
                <feMergeNode in="brushed" />
                <feMergeNode in="highlight" />
                <feMergeNode in="shadow" />
            </feMerge>
        </filter>

        {/**/}
        <radialGradient id="glass_convex" cx="40%" cy="30%" r="60%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#8E8E93" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#0A0A0C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.98" />
        </radialGradient>

        {/**/}
        <filter id="optical_glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
        </filter>

        {/**/}
        <linearGradient id="lens_collar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#A1A1A6" />
            <stop offset="70%" stopColor="#2C2C2E" />
            <stop offset="100%" stopColor="#000000" />
        </linearGradient>
    </defs>

    {/**/}
    <motion.g filter="url(#hard_machined_metal)"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
        >
        {/**/}
        <path d="M68.04 35.36L110.85 31.21L105.71 72.12L75.75 86.00Z" fill="url(#titanium_base)" />
        <path d="M140.00 40.00L165.00 75.00L127.00 91.00L100.00 72.00Z" fill="url(#titanium_base)" />
        <path d="M171.96 104.64L154.15 143.79L121.29 118.88L124.25 86.00Z" fill="url(#titanium_base)" />
        <path d="M131.96 164.64L89.15 168.79L94.29 127.88L124.25 114.00Z" fill="url(#titanium_base)" />
        <path d="M60.00 160.00L35.00 125.00L73.00 109.00L100.00 128.00Z" fill="url(#titanium_base)" />
        <path d="M28.04 95.36L45.85 56.21L78.71 81.12L75.75 114.00Z" fill="url(#titanium_base)" />

        {/**/}
        <path
            d="M100 65C119.33 65 135 80.67 135 100C135 119.33 119.33 135 100 135C80.67 135 65 119.33 65 100C65 80.67 80.67 65 100 65ZM100 75C86.1929 75 75 86.1929 75 100C75 113.807 86.1929 125 100 125C113.807 125 125 113.807 125 100C125 86.1929 113.807 75 100 75Z"
            fill="url(#titanium_base)" fillRule="evenodd" />
    </motion.g>

    {/**/}
    <g>
        {/**/}
        <circle cx="100" cy="100" r="25.5" fill="none" stroke="url(#lens_collar)" strokeWidth="2.5" />

        {/**/}
        <circle cx="100" cy="100" r="24.5" fill="#020202" />

        {/**/}
        <circle cx="100" cy="100" r="23" fill="none" stroke="#252528" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="#050505" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="17" fill="none" stroke="#3A3A3C" strokeWidth="0.3" opacity="0.8" />

        {/**/}
        <circle cx="100" cy="100" r="16.5" fill="url(#glass_convex)" />

        {/**/}
        <g>
            <circle cx="100" cy="100" r="8" fill="#010101" />
            <circle cx="98" cy="98" r="5" fill="none" stroke="#4A2E65" strokeWidth="1.5" opacity="0.6" filter="url(#optical_glow)" />
            <circle cx="103" cy="103" r="3" fill="none" stroke="#2E5A65" strokeWidth="1" opacity="0.5" filter="url(#optical_glow)" />
            <circle cx="100" cy="100" r="1.5" fill="#111115" />
        </g>

        {/**/}
        <path d="M 84 89 A 19 19 0 0 1 116 89 A 21 21 0 0 0 84 89 Z" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="91" cy="92" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 91 92)" />
        <path d="M 88 111 A 15 15 0 0 0 112 111 A 14 14 0 0 1 88 111 Z" fill="#FFFFFF" opacity="0.2" />
    </g>
</svg>

);

export default AnimatedLogo;