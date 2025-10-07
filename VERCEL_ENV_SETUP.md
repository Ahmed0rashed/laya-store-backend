# Vercel Environment Variables Setup

## The Issue
Vercel is not loading your environment variables, causing the MongoDB connection to fail with "uri parameter must be a string, got undefined".

## Solution

### Step 1: Set Environment Variables in Vercel Dashboard

1. Go to your project on [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

```
NODE_ENV = production
PORT = 3000
MONGODB_URI = mongodb+srv://ahmedrashedahmed236_db_user:3AQypYzWKVYKdvsV@cluster0.epsxwrn.mongodb.net/laya
JWT_SECRET = a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
JWT_EXPIRES_IN = 7d
CLOUDINARY_CLOUD_NAME = dl7foxotj
CLOUDINARY_API_KEY = 535346436925435
CLOUDINARY_API_SECRET = FX6KWh9x1vMFeRaeIb7BvmHkOuk
CLOUDINARY_KEY_NAME = Root
BCRYPT_SALT_ROUNDS = 12
```

### Step 2: Environment Variable Configuration

- **Environment**: Select "Production" for all variables
- **Make sure to copy the exact values** from your `config.env` file
- **Don't include spaces** around the `=` sign
- **Values should not be quoted** unless they contain spaces

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 4: Verify Environment Variables

The updated code will now log environment variables on startup:
```
Environment check:
NODE_ENV: production
MONGODB_URI exists: true
PORT: 3000
```

## Alternative: Using Vercel CLI

You can also set environment variables using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
# ... add all other variables

# Deploy
vercel --prod
```

## Troubleshooting

### If MONGODB_URI is still undefined:

1. **Check Vercel Dashboard**: Ensure all environment variables are set
2. **Check Environment**: Make sure variables are set for "Production"
3. **Redeploy**: Environment variables only take effect after redeployment
4. **Check Logs**: Look at Vercel function logs for the environment check output

### Common Issues:

1. **Wrong Environment**: Variables set for "Development" won't work in production
2. **Typos**: Double-check variable names (case-sensitive)
3. **Missing Redeploy**: Changes require redeployment to take effect
4. **Special Characters**: Some characters in values might need escaping

## Security Notes

- Never commit your actual environment variables to Git
- Use strong, unique secrets for production
- Consider rotating secrets periodically
- Monitor your Vercel dashboard for any security alerts

## Testing

After deployment, test your API:
- Main endpoint: `https://your-project.vercel.app`
- Health check: `https://your-project.vercel.app/health`
- API routes: `https://your-project.vercel.app/api/v1/...`
