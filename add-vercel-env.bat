@echo off
REM Vercel Environment Variables Setup Script for Windows
REM Run this script to quickly add all environment variables to Vercel

echo 🚀 Adding Environment Variables to Vercel...
echo Make sure you're logged in to Vercel CLI (vercel login)

REM Add each environment variable
echo Adding NODE_ENV...
vercel env add NODE_ENV production

echo Adding PORT...
vercel env add PORT 5000

echo Adding MONGODB_URI...
vercel env add MONGODB_URI mongodb+srv://ahmedrashedahmed236_db_user:3AQypYzWKVYKdvsV@cluster0.epsxwrn.mongodb.net/laya

echo Adding JWT_SECRET...
vercel env add JWT_SECRET a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0

echo Adding JWT_EXPIRES_IN...
vercel env add JWT_EXPIRES_IN 7d

echo Adding CLOUDINARY_CLOUD_NAME...
vercel env add CLOUDINARY_CLOUD_NAME dl7foxotj

echo Adding CLOUDINARY_API_KEY...
vercel env add CLOUDINARY_API_KEY 535346436925435

echo Adding CLOUDINARY_API_SECRET...
vercel env add CLOUDINARY_API_SECRET FX6KWh9x1vMFeRaeIb7BvmHkOuk

echo Adding CLOUDINARY_KEY_NAME...
vercel env add CLOUDINARY_KEY_NAME Root

echo Adding BCRYPT_SALT_ROUNDS...
vercel env add BCRYPT_SALT_ROUNDS 12

echo ✅ All environment variables added!
echo 🚀 Deploying to production...
vercel --prod

echo ✅ Deployment complete! Your API should now work.
pause
