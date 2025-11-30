#!/usr/bin/env node

/**
 * Mental Health Hub Launcher
 * This script launches the application and handles all environment setup
 */

const path = require('path');
const fs = require('fs');

// Set up environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '3001';

// Get the directory where the executable is located
const appDir = process.pkg ? path.dirname(process.execPath) : __dirname;

console.log('\n=================================');
console.log('🏥 Mental Health Hub');
console.log('=================================');
console.log('Starting application...');
console.log('App Directory:', appDir);
console.log('=================================\n');

// Create .env file if it doesn't exist
const envPath = path.join(appDir, '.env');
if (!fs.existsSync(envPath)) {
    const envContent = `# Mental Health Hub Environment Variables
PORT=3001
NODE_ENV=production
HUGGINGFACE_API_KEY=your_api_key_here
`;
    try {
        fs.writeFileSync(envPath, envContent);
        console.log('✓ Created .env file');
    } catch (error) {
        console.log('⚠ Could not create .env file:', error.message);
    }
}

// Load the main server
try {
    require('./server.js');
} catch (error) {
    console.error('\n❌ Error starting server:', error.message);
    console.error('\nPlease make sure:');
    console.error('1. Port 3001 is not already in use');
    console.error('2. You have proper permissions');
    console.error('3. All required files are present\n');
    
    if (!process.pkg) {
        console.error('Stack trace:', error.stack);
    }
    
    process.exit(1);
}
