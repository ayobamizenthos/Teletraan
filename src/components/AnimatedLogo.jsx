import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ className }) => (
<svg className={className} viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            {/**/}
            {/**/}
            {/**/}
            {/**/}

            {/**/}
            {/**/}
            <linearGradient id="thead-top" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E4E9EF" />
                <stop offset="30%" stopColor="#CED5DC" />
                <stop offset="65%" stopColor="#8E97A2" />
                <stop offset="100%" stopColor="#5B636C" />
            </linearGradient>

            {/**/}
            <linearGradient id="thead-front" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E4E9EF" />
                <stop offset="25%" stopColor="#C5CFDB" />
                <stop offset="65%" stopColor="#7B8591" />
                <stop offset="100%" stopColor="#343B43" />
            </linearGradient>

            {/**/}
            <linearGradient id="thead-left" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#A9B3BD" />
                <stop offset="100%" stopColor="#6F7984" />
            </linearGradient>
            <linearGradient id="thead-right" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#24282D" />
                <stop offset="100%" stopColor="#0E1013" />
            </linearGradient>

            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <linearGradient id="lstone-main" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9099A5" />
                <stop offset="100%" stopColor="#464D56" />
            </linearGradient>
            {/**/}
            <linearGradient id="lstone-inner" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3A414A" />
                <stop offset="100%" stopColor="#1D2228" />
            </linearGradient>

            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <linearGradient id="rstone-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#AEB7C2" />
            </linearGradient>
            {/**/}
            <linearGradient id="rstone-main" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#97A1AC" />
                <stop offset="100%" stopColor="#3B4149" />
            </linearGradient>

            {/**/}
            <linearGradient id="rstone-inner" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#21262D" />
                <stop offset="100%" stopColor="#07080B" />
            </linearGradient>

            {/**/}
            {/**/}
            {/**/}

            {/**/}
            <linearGradient id="glare-horizontal-center" gradientUnits="userSpaceOnUse" x1="332" y1="0" x2="692" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="35%" stopColor="#FFFFFF" stopOpacity="1.0" />
                <stop offset="65%" stopColor="#FFFFFF" stopOpacity="1.0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/**/}
            <linearGradient id="glare-vertical-fade-down" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1.0" />
                <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/**/}
            <linearGradient id="glare-vertical-center" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
                <stop offset="25%" stopColor="#FFFFFF" stopOpacity="1.0" />
                <stop offset="75%" stopColor="#FFFFFF" stopOpacity="1.0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/**/}
            <linearGradient id="glare-chamfer-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>

            {/**/}
            <linearGradient id="glare-horizontal-outward" gradientUnits="userSpaceOnUse" x1="490" y1="0" x2="442"
                y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="glare-horizontal-outward-right" gradientUnits="userSpaceOnUse" x1="545" y1="0" x2="608"
                y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/**/}
            <filter id="overlap-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="-5" dy="15" stdDeviation="12" floodColor="#000000" floodOpacity="0.55" />
            </filter>


        </defs>

        <g transform="translate(0, -10)">

            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <polygon points="442,415 490,415 490,681 442,681" fill="url(#lstone-main)" />

            {/**/}
            {/**/}
            <polygon points="490,415 512,428 512,681 490,681" fill="url(#lstone-inner)" />

            {/**/}
            {/**/}
            <polygon points="442,681 490,681 512,750" fill="#404750" />
            <polygon points="490,681 512,681 512,750" fill="#1D2228" />


            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            <polygon points="260,260 764,260 692,340 332,340" fill="url(#thead-top)" />

            {/**/}
            {/**/}
            <polygon points="260,260 332,340 332,395 260,315" fill="url(#thead-left)" />
            {/**/}
            <polygon points="764,260 692,340 692,395 764,315" fill="url(#thead-right)" />

            {/**/}
            <polygon points="332,340 692,340 692,395 332,395" fill="url(#thead-front)" />


            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}

            {/**/}

            <g filter="url(#overlap-shadow)">
                {/**/}
                {/**/}
                {/**/}
                <polygon points="512,385 545,365 545,681 512,681" fill="url(#rstone-hero)" />

                {/**/}
                {/**/}
                <polygon points="545,365 608,432 608,681 545,681" fill="url(#rstone-main)" />

                {/**/}
                {/**/}
                <polygon points="512,681 545,681 512,750" fill="#B0B9C4" />
                <polygon points="545,681 608,681 512,750" fill="#2E3339" />
            </g>


            {/**/}
            {/**/}
            {/**/}
            {/**/}
            {/**/}

            {/**/}
            {/**/}

            {/**/}
            {/**/}
            <path d="M 332,340 Q 512,336.5 692,340 Q 512,343.5 332,340 Z" fill="url(#glare-horizontal-center)" />

            {/**/}
            <path d="M 260,260 L 264,260 Q 298,300 332,340 Z" fill="url(#glare-vertical-fade-down)" />

            {/**/}
            <path d="M 764,260 L 760,260 Q 726,300 692,340 Z" fill="url(#glare-vertical-fade-down)" />

            {/**/}
            <path d="M 332,340 L 336,340 L 332,395 Z" fill="url(#glare-vertical-fade-down)" />

            {/**/}
            <path d="M 692,340 L 688,340 L 692,395 Z" fill="url(#glare-vertical-fade-down)" />


            {/**/}
            {/**/}

            {/**/}
            {/**/}

            {/**/}
            {/**/}
            <path d="M 490,415 Q 483,547.5 490,680 Z" fill="url(#glare-vertical-center)" />

            {/**/}
            <path d="M 490,681 L 490,676 Q 460,677 442,681 Z" fill="url(#glare-horizontal-outward)" />

            {/**/}
            <path d="M 490,680 L 493,680 L 512,750 Z" fill="url(#glare-chamfer-fade)" />


            {/**/}
            {/**/}
            {/**/}

            {/**/}
            {/**/}

            {/**/}
            {/**/}
            <path d="M 545,365 Q 552,522.5 545,680 Z" fill="url(#glare-vertical-center)" />

            {/**/}
            <path d="M 545,681 L 545,676 Q 575,677 608,681 Z" fill="url(#glare-horizontal-outward-right)" />

            {/**/}
            <path d="M 545,680 L 542,680 L 512,750 Z" fill="url(#glare-chamfer-fade)" />

        </g>
    </svg>
);

export default AnimatedLogo;