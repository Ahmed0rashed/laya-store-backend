# Vercel Deployment Guide for Laya Store

This guide will help you deploy your Laya Store API to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. MongoDB Atlas database (or any MongoDB instance)
4. Cloudinary account for image storage

## Step 1: Prepare Your Repository

Your project is already configured with the necessary files:
- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Updated with production scripts
- ✅ CORS configuration for production
- ✅ Health check endpoint

## Step 2: Environment Variables

You need to set up the following environment variables in Vercel:

### Required Environment Variables:

```bash
# Server Configuration
NODE_ENV=production
PORT=3000

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_KEY_NAME=Root

# Other Configuration
BCRYPT_SALT_ROUNDS=12
```

## Step 3: Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts to configure your project.

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables (see Step 2)
5. Deploy

## Step 4: Configure Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add all the environment variables listed in Step 2
4. Make sure to use your actual production values

## Step 5: Update CORS Configuration

After deployment, update the CORS configuration in `src/app.js`:

```javascript
const allowedOrigins = [
  'https://your-frontend-domain.vercel.app',
  'https://your-custom-domain.com',
  // Add your actual frontend URLs here
];
```

## Step 6: Test Your Deployment

1. Visit your deployed URL (e.g., `https://your-project.vercel.app`)
2. Test the health endpoint: `https://your-project.vercel.app/health`
3. Test your API endpoints

## Important Notes

### Database Connection
- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
- Or add Vercel's IP ranges to your MongoDB Atlas whitelist

### CORS Configuration
- Update the `allowedOrigins` array in `src/app.js` with your actual frontend domains
- Remove the placeholder URLs and add your real production URLs

### Security
- Never commit your actual environment variables to Git
- Use strong, unique secrets for production
- Consider using Vercel's environment variable encryption

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check your MongoDB URI
   - Ensure your MongoDB cluster allows external connections
   - Verify your database credentials

2. **CORS Errors**
   - Update the `allowedOrigins` array with your frontend domain
   - Check that your frontend is making requests to the correct API URL

3. **Environment Variables Not Working**
   - Verify all environment variables are set in Vercel dashboard
   - Check that variable names match exactly (case-sensitive)
   - Redeploy after adding new environment variables

4. **Build Failures**
   - Check that all dependencies are in `dependencies` (not `devDependencies`)
   - Ensure your `package.json` has the correct `start` script

## Monitoring

- Use Vercel's built-in analytics and monitoring
- Check the Functions tab for serverless function logs
- Monitor your MongoDB Atlas dashboard for database performance

## Next Steps

1. Set up a custom domain (optional)
2. Configure automatic deployments from your main branch
3. Set up monitoring and alerting
4. Consider implementing API rate limiting and caching

## Support

If you encounter issues:
1. Check Vercel's documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review your deployment logs in the Vercel dashboard
3. Test your API endpoints using tools like Postman or curl
