# Fly.io Deployment Guide for Laya Store

This guide will help you deploy your Laya Store application to Fly.io.

## Prerequisites

1. **Install Fly.io CLI**: https://fly.io/docs/hands-on/install-flyctl/

```bash
# Windows (PowerShell)
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# macOS/Linux
curl -L https://fly.io/install.sh | sh
```

2. **Sign up or Login**:
```bash
flyctl auth signup  # Create a new account
# OR
flyctl auth login   # Login to existing account
```

## Step-by-Step Deployment

### 1. Launch Your App

```bash
flyctl launch
```

This will:
- Detect your Dockerfile
- Ask you to choose an app name (or use auto-generated)
- Select a region (choose closest to your users)
- Ask if you want PostgreSQL/Redis (select No, since you're using MongoDB)
- Create a `fly.toml` file (already created)

**Important**: When asked "Would you like to deploy now?", say **No** first, as we need to set up environment variables.

### 2. Set Environment Variables (Secrets)

Your application needs these environment variables. Set them as Fly.io secrets:

```bash
# MongoDB Connection
flyctl secrets set MONGODB_URI="mongodb+srv://ahmedrashedahmed236_db_user:3AQypYzWKVYKdvsV@cluster0.epsxwrn.mongodb.net/laya"

# JWT Configuration
flyctl secrets set JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0"
flyctl secrets set JWT_EXPIRES_IN="7d"

# Cloudinary Configuration
flyctl secrets set CLOUDINARY_CLOUD_NAME="dl7foxotj"
flyctl secrets set CLOUDINARY_API_KEY="535346436925435"
flyctl secrets set CLOUDINARY_API_SECRET="FX6KWh9x1vMFeRaeIb7BvmHkOuk"
flyctl secrets set CLOUDINARY_KEY_NAME="Root"

# Other Configuration
flyctl secrets set BCRYPT_SALT_ROUNDS="12"
flyctl secrets set NODE_ENV="production"
```

**Set all secrets in one command (recommended)**:
```bash
flyctl secrets set \
  MONGODB_URI="mongodb+srv://ahmedrashedahmed236_db_user:3AQypYzWKVYKdvsV@cluster0.epsxwrn.mongodb.net/laya" \
  JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0" \
  JWT_EXPIRES_IN="7d" \
  CLOUDINARY_CLOUD_NAME="dl7foxotj" \
  CLOUDINARY_API_KEY="535346436925435" \
  CLOUDINARY_API_SECRET="FX6KWh9x1vMFeRaeIb7BvmHkOuk" \
  CLOUDINARY_KEY_NAME="Root" \
  BCRYPT_SALT_ROUNDS="12" \
  NODE_ENV="production"
```

### 3. Deploy Your Application

```bash
flyctl deploy
```

This will:
- Build your Docker image
- Push it to Fly.io registry
- Deploy your application
- Start your app

### 4. Check Deployment Status

```bash
# View app status
flyctl status

# View logs
flyctl logs

# Open your app in browser
flyctl open

# View app information
flyctl info
```

## Important Notes

### MongoDB Atlas Configuration

Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or specifically from Fly.io IPs:

1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` for all IPs (or add Fly.io specific IPs)

### Port Configuration

- Fly.io sets the `PORT` environment variable to `8080` by default
- Your `server.js` already uses `process.env.PORT` so it will work automatically
- The `fly.toml` is configured for port 8080

### Scaling

```bash
# Scale to specific regions
flyctl scale count 2

# Scale to specific VM size
flyctl scale vm shared-cpu-1x

# View current scale
flyctl scale show
```

## Useful Commands

```bash
# View all apps
flyctl apps list

# View app dashboard
flyctl dashboard

# SSH into your app
flyctl ssh console

# Restart your app
flyctl apps restart

# View secrets
flyctl secrets list

# Remove a secret
flyctl secrets unset SECRET_NAME

# View deployments history
flyctl releases

# Rollback to previous version
flyctl releases rollback

# Destroy app (careful!)
flyctl apps destroy laya-store
```

## Troubleshooting

### Check Logs
```bash
flyctl logs
```

### Health Check Failing
If health checks fail, check:
1. Your app is listening on the correct port (PORT env variable)
2. The `/` route returns a 200 status
3. MongoDB connection is successful

### Connection Issues
```bash
# Check if app is running
flyctl status

# SSH into the container
flyctl ssh console

# Check environment variables
flyctl ssh console -C "env"
```

### MongoDB Connection Issues
- Verify MongoDB URI is correct
- Check MongoDB Atlas Network Access whitelist
- Ensure your MongoDB cluster is running

## Custom Domain (Optional)

```bash
# Add a custom domain
flyctl certs add yourdomain.com

# View certificates
flyctl certs list
```

Then add these DNS records to your domain:
- `A` record: `@` → (Fly.io IP from certs list)
- `AAAA` record: `@` → (Fly.io IPv6 from certs list)

## Monitoring

```bash
# View metrics
flyctl dashboard

# View real-time metrics
flyctl metrics
```

## Cost Optimization

- Fly.io offers a free tier
- Set `auto_stop_machines = true` in fly.toml to stop when idle
- Set `min_machines_running = 0` to scale to zero when not in use

## Security Best Practices

1. ✅ Never commit secrets to Git
2. ✅ Use Fly.io secrets for environment variables
3. ✅ Keep your MongoDB credentials secure
4. ✅ Regularly rotate JWT secrets
5. ✅ Enable HTTPS (Fly.io provides this automatically)

## Support

- Fly.io Docs: https://fly.io/docs/
- Fly.io Community: https://community.fly.io/
- Fly.io Status: https://status.flyio.net/

---

**Your app will be available at**: `https://laya-store.fly.dev` (or your custom domain)

