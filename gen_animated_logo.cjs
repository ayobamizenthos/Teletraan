const fs = require('fs');
const svg = fs.readFileSync('public/teletraan.svg', 'utf8');

// Replace <svg...> with <svg className={className} ...>
let reactSvg = svg.replace(/<svg\s[^>]*>/, '<svg className={className} viewBox="15 15 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">');

// React attributes modifications from standard SVG
reactSvg = reactSvg.replace(/fill-rule/g, 'fillRule');
reactSvg = reactSvg.replace(/flood-color/g, 'floodColor');
reactSvg = reactSvg.replace(/flood-opacity/g, 'floodOpacity');
reactSvg = reactSvg.replace(/stroke-width/g, 'strokeWidth');
reactSvg = reactSvg.replace(/stop-color/g, 'stopColor');
reactSvg = reactSvg.replace(/stop-opacity/g, 'stopOpacity');

// Wrap the machined group in motion.g
reactSvg = reactSvg.replace(/<g filter="url\(#hard_machined_metal\)">/,
    '<motion.g filter="url(#hard_machined_metal)"\n' +
    '            animate={{ rotate: 360 }}\n' +
    '            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}\n' +
    '            style={{ transformOrigin: "100px 100px" }}\n' +
    '        >'
);

// Close the motion.g
reactSvg = reactSvg.replace(/<\/g>\s*<!-- INNER REALISTIC LENS MODULE/, '</motion.g>\n\n    <!-- INNER REALISTIC LENS MODULE');

const componentCode = `import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ className }) => (
${reactSvg}
);

export default AnimatedLogo;`;

fs.writeFileSync('src/components/AnimatedLogo.jsx', componentCode);
console.log('Successfully created src/components/AnimatedLogo.jsx');
