#!/usr/bin/env node
/**
 * Generate favicon and logo assets from the SharkByte logo
 * Requires: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, 'docs', 'sharkbyte_logo.png');
const webDir = path.join(__dirname, 'web', 'kiri');

async function generateFavicons() {
    console.log('🦈 Generating SharkByte favicons and logos...\n');

    try {
        // Read the original logo
        const logo = sharp(logoPath);

        // Generate favicon.ico (16x16 and 32x32)
        await logo
            .resize(32, 32)
            .toFile(path.join(webDir, 'favicon-32.png'));
        console.log('✅ Generated favicon-32.png');

        await logo
            .resize(16, 16)
            .toFile(path.join(webDir, 'favicon-16.png'));
        console.log('✅ Generated favicon-16.png');

        // Generate mobile favicon
        await logo
            .resize(180, 180)
            .toFile(path.join(webDir, 'favicon-mobile.png'));
        console.log('✅ Generated favicon-mobile.png (180x180)');

        // Generate PWA icons
        await logo
            .resize(512, 512)
            .toFile(path.join(webDir, 'logo-shark-512.png'));
        console.log('✅ Generated logo-shark-512.png');

        await logo
            .resize(144, 144)
            .toFile(path.join(webDir, 'logo-shark-144.png'));
        console.log('✅ Generated logo-shark-144.png');

        // Generate loading/splash image
        await logo
            .resize(256, 256)
            .toFile(path.join(webDir, 'logo-loading.png'));
        console.log('✅ Generated logo-loading.png');

        // Copy main favicon
        await logo
            .resize(32, 32)
            .toFormat('png')
            .toFile(path.join(webDir, 'favicon.ico.tmp'));

        // Rename as .ico (browsers accept PNG with .ico extension)
        fs.renameSync(
            path.join(webDir, 'favicon.ico.tmp'),
            path.join(webDir, 'favicon.ico')
        );
        console.log('✅ Generated favicon.ico');

        console.log('\n✨ All favicon assets generated successfully!');
        console.log('📁 Location:', webDir);

    } catch (error) {
        console.error('❌ Error generating favicons:', error.message);
        console.log('\nMake sure to install sharp: npm install sharp');
    }
}

// Run if executed directly
if (require.main === module) {
    generateFavicons();
}

module.exports = { generateFavicons };