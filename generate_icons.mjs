import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const svgPath = path.resolve(__dirname, 'public', 'teletraan.svg');

// Update SVG files
fs.copyFileSync(svgPath, path.resolve(__dirname, 'logo.svg'));
fs.copyFileSync(svgPath, path.resolve(__dirname, 'public', 'logo.svg'));

// Define PNG targets
const targets = [
    { dest: path.resolve(__dirname, 'build', 'icon.png'), width: 512, height: 512 },
    { dest: path.resolve(__dirname, 'electron', 'teletraan.png'), width: 256, height: 256 },
    { dest: path.resolve(__dirname, 'public', 'teletraan.png'), width: 512, height: 512 },
];

console.log('Generating high-res icons from:', svgPath);

Promise.all(targets.map(target => {
    return sharp(svgPath)
        .resize(target.width, target.height)
        .png()
        .toFile(target.dest)
        .then(info => console.log(`Created ${target.dest} - Size: ${info.size}`))
}))
    .then(() => {
        console.log('All icons replaced successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error generating icons:', err);
        process.exit(1);
    });
