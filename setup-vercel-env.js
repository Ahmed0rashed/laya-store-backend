#!/usr/bin/env node

/**
 * Vercel Environment Variables Setup Helper
 * This script helps you set up environment variables for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel Environment Variables Setup Helper\n');

// Read the config.env file
const envPath = path.join(__dirname, 'config.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ config.env file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse environment variables
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

console.log('📋 Environment Variables to Add to Vercel:\n');

Object.entries(envVars).forEach(([key, value]) => {
  console.log(`${key} = ${value}`);
});

console.log('\n🔧 How to Add These to Vercel:');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your project');
console.log('3. Go to Settings → Environment Variables');
console.log('4. Add each variable above');
console.log('5. Set Environment to "Production" for all variables');
console.log('6. Click "Save"');
console.log('7. Redeploy your project');

console.log('\n⚡ Quick Vercel CLI Commands:');
console.log('npm i -g vercel');
console.log('vercel login');
Object.entries(envVars).forEach(([key, value]) => {
  console.log(`vercel env add ${key}`);
});
console.log('vercel --prod');

console.log('\n✅ After setting environment variables, your deployment should work!');
