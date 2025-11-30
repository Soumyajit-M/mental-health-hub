# Cloud Deployment Configuration

## ☁️ Deploy to Cloud Platforms

This folder contains configuration files for deploying Mental Health Hub to various cloud platforms.

---

## 📁 Files Included

### 1. Procfile
**For:** Render, Railway, Heroku

Tells the platform how to start your application:
```
web: node server.js
```

### 2. vercel.json
**For:** Vercel platform

Configures serverless deployment:
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

### 3. DEPLOYMENT_GUIDE.md
Complete step-by-step instructions for all platforms.

---

## 🚀 Quick Deploy Options

### Option 1: Render (Recommended) ⭐

**Why Render:**
- ✅ 750 hours/month free
- ✅ Auto HTTPS
- ✅ GitHub auto-deploy
- ✅ Easy setup
- ✅ Great for demos

**Deploy in 5 Minutes:**

1. **Sign up:** https://render.com
2. **New Web Service**
3. **Connect GitHub:** `Soumyajit-M/mental-health-hub`
4. **Configure:**
   ```
   Name: mental-health-hub
   Build Command: npm install
   Start Command: node server.js
   Plan: Free
   ```
5. **Deploy!**

**Get URL:** `https://mental-health-hub-xxxx.onrender.com`

---

### Option 2: Railway

**Why Railway:**
- ✅ $5 free credits/month
- ✅ Very fast deployment
- ✅ Simple interface
- ✅ Good alternative to Render

**Deploy Steps:**

1. **Sign up:** https://railway.app
2. **New Project** → Deploy from GitHub
3. **Select:** `mental-health-hub`
4. **Auto-detects** and deploys
5. **Get URL!**

---

### Option 3: Vercel

**Note:** Best for frontend. Backend needs serverless functions.

**For this app:** Use Render or Railway instead (easier setup).

---

## ⚙️ Configuration

### Environment Variables

Set these in your cloud platform dashboard:

```bash
# Required
NODE_ENV=production
PORT=3001  # Or use platform default

# Optional (for AI features)
HUGGINGFACE_API_KEY=your_api_key_here
```

### Build Settings

**Install Dependencies:**
```bash
npm install --production
```

**Start Application:**
```bash
node server.js
```

---

## 📊 Platform Comparison

| Platform | Free Tier | Uptime | Speed | Setup | Best For |
|----------|-----------|--------|-------|-------|----------|
| **Render** | 750h/month | Sleep after 15min | Fast | Easy | ⭐ Demos |
| **Railway** | $5 credits | Always on | Very Fast | Easy | Production |
| **Vercel** | Unlimited | Always on | Fastest | Complex | Frontend |
| **Heroku** | None (paid) | - | Good | Easy | - |

**Recommendation:** Use **Render** for academic projects and demos!

---

## 🔒 Security

All platforms provide:
- ✅ Automatic HTTPS
- ✅ SSL certificates
- ✅ DDoS protection
- ✅ Firewall protection
- ✅ Secure environment variables

---

## 🌐 Custom Domain (Optional)

### With Render:
1. **Free Plan:** Use `yourapp.onrender.com`
2. **Paid Plan:** Add custom domain (e.g., `mentalhealthhub.com`)

### Steps:
1. Buy domain (Namecheap, GoDaddy)
2. Add in Render dashboard
3. Update DNS records
4. HTTPS auto-configured

---

## 📈 Monitoring

### Render Dashboard:
- ✅ View logs in real-time
- ✅ Check deployment status
- ✅ Monitor resource usage
- ✅ View request metrics

### Access Logs:
```bash
# In Render dashboard
Logs → View Recent Activity
```

---

## 🔄 Auto-Deploy

### Setup Auto-Deploy:

**Connected to GitHub:**
Every time you push code:
```bash
git add -A
git commit -m "Update app"
git push
```

**Render automatically:**
1. Detects changes
2. Rebuilds application
3. Deploys new version
4. Updates live URL

**Takes:** 2-3 minutes per deploy

---

## 🎯 Deployment Checklist

Before deploying:

- ✅ Code pushed to GitHub
- ✅ package.json has all dependencies
- ✅ .gitignore excludes node_modules
- ✅ Environment variables ready
- ✅ Port configuration flexible (uses process.env.PORT)
- ✅ Database connections (if any) configured

After deploying:

- ✅ Test the live URL
- ✅ Check all features work
- ✅ Test on mobile device
- ✅ Verify HTTPS works
- ✅ Check logs for errors

---

## 🐛 Troubleshooting

### Build Fails:

**Check:**
- ✅ package.json is valid
- ✅ All dependencies listed
- ✅ Node version compatible
- ✅ Build logs in dashboard

**Fix:**
```bash
# Test locally first
npm install
npm start
```

### App Won't Start:

**Check:**
- ✅ Start command correct
- ✅ Port configuration (use process.env.PORT)
- ✅ Environment variables set
- ✅ Logs show actual error

**Common Issue:**
```javascript
// Bad (fixed port)
const PORT = 3001;

// Good (flexible port)
const PORT = process.env.PORT || 3001;
```

### 502 Bad Gateway:

**Causes:**
- Application crashed
- Start command wrong
- Syntax error in code

**Fix:**
- Check logs
- Fix errors
- Redeploy

---

## 💰 Cost

### Render Free Tier:
- **Hours:** 750/month
- **Memory:** 512 MB
- **Bandwidth:** 100 GB
- **Storage:** 1 GB
- **Cost:** $0

**Good for:**
- Academic projects
- Demos
- Testing
- Small user base

### Upgrade ($7/month):
- Always on (no sleep)
- More resources
- Better performance
- Production use

---

## 📱 Mobile Access

Once deployed, access from:

- ✅ Android phones
- ✅ iPhones
- ✅ Tablets
- ✅ Laptops
- ✅ Desktop computers

**Just share the URL!**

---

## 🎓 For Academic Submission

### Include in Submission:

**Deployment Info:**
```
Deployed URL: https://mental-health-hub-xxxx.onrender.com
Platform: Render (Free Tier)
Deployment Date: [Date]
Status: Live and Accessible
```

**Screenshots:**
- Dashboard showing deployment
- Live URL in browser
- Mobile view on phone
- Logs showing activity

**Presentation:**
- Show live URL
- Access on phone during demo
- Demonstrate cloud deployment
- Impress with production-ready app!

---

## 🚀 Quick Start

**Fastest Way to Deploy:**

```bash
# 1. Sign up for Render
https://render.com

# 2. New Web Service
Connect GitHub repo

# 3. Configure
Build: npm install
Start: node server.js

# 4. Deploy
Click "Create Web Service"

# 5. Wait 2-3 minutes
Get your URL!

# 6. Access from anywhere
Share with friends!
```

---

## 📖 Detailed Guide

For complete step-by-step instructions:

**Read:** `DEPLOYMENT_GUIDE.md` in this folder

Includes:
- Detailed screenshots
- Troubleshooting tips
- Advanced configuration
- Multiple platform guides

---

## ✅ Deployment Status

After following the guide:

- ✅ App deployed to cloud
- ✅ Accessible via HTTPS
- ✅ Works on all devices
- ✅ Auto-deploys from GitHub
- ✅ Free hosting
- ✅ Production-ready

**Your Mental Health Hub is now live on the internet!** 🎉

---

## 🌟 Benefits of Cloud Deployment

- ✅ Access from anywhere
- ✅ No PC needed to run
- ✅ Share easily (just URL)
- ✅ Professional hosting
- ✅ HTTPS secure
- ✅ Auto-updates
- ✅ Global availability
- ✅ Mobile-friendly

---

**Ready to deploy?**

See `DEPLOYMENT_GUIDE.md` for complete instructions! 🚀
