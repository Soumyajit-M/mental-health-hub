# Mental Health Hub - Cloud Deployment Guide

## 🚀 Deploy to Render (Recommended - 100% Free)

### Step 1: Prepare Your GitHub Repository
Your code is already on GitHub: `https://github.com/Soumyajit-M/mental-health-hub`

### Step 2: Sign Up for Render
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account

### Step 3: Create New Web Service
1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub account (if not already connected)
4. Select the repository: `mental-health-hub`
5. Click "Connect"

### Step 4: Configure the Service
Fill in these settings:

```
Name: mental-health-hub
Region: Choose closest to you (e.g., Oregon, Singapore, Frankfurt)
Branch: main
Root Directory: (leave empty)
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

### Step 5: Set Environment Variables (Optional)
Click "Advanced" and add environment variables:

```
Key: NODE_ENV
Value: production

Key: HUGGINGFACE_API_KEY
Value: your_huggingface_api_key_here (optional)
```

### Step 6: Choose Plan
- Select **Free** plan
- Free tier includes:
  - 750 hours/month (enough for 24/7)
  - Automatic HTTPS
  - Auto-deploy from GitHub
  - Custom domain support

### Step 7: Deploy!
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://mental-health-hub-xxxx.onrender.com`

### Step 8: Access from Your Android Phone
1. Open the URL in your phone's browser
2. Add to home screen for app-like experience:
   - **Chrome:** Menu → Add to Home screen
   - **Firefox:** Menu → Add to Home screen
   - **Safari:** Share → Add to Home Screen

---

## 📱 Alternative: Deploy to Railway

### Railway Setup (Also Free)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `mental-health-hub`
6. Railway auto-detects and deploys
7. Get public URL

**Railway Free Tier:**
- $5 free credits per month
- Enough for hobby projects
- Automatic HTTPS

---

## 🌐 Alternative: Deploy to Vercel (Frontend Only)

Vercel is great but needs serverless setup for backend. Use Render or Railway instead for easier deployment.

---

## ⚡ Quick Deploy Commands (One-Click Deploy)

### For Render:
Once connected, every `git push` automatically deploys!

```bash
# Make any changes
git add -A
git commit -m "Update application"
git push

# Render automatically deploys in 2-3 minutes
```

---

## 🎯 After Deployment

### Your App Will Be Available At:
- **Render:** `https://mental-health-hub-xxxx.onrender.com`
- **Railway:** `https://mental-health-hub-production.up.railway.app`

### Access from Android Phone:
1. Open URL in any browser
2. Works immediately
3. Responsive design adapts to mobile
4. Save as home screen bookmark

### Features That Work on Mobile:
- ✅ AI Chat
- ✅ Real-time messaging
- ✅ Community forum
- ✅ Resource browsing
- ✅ Dark/Light mode
- ✅ All features responsive

---

## 🔧 Troubleshooting

### If Deployment Fails:
1. Check build logs in Render dashboard
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### If App Doesn't Load:
1. Check service is running (green status in Render)
2. View logs in dashboard
3. Make sure environment variables are set

### If Socket.IO Doesn't Work:
Already configured correctly in your code! WebSocket works fine on Render.

---

## 💰 Cost Comparison

| Platform | Free Tier | Best For |
|----------|-----------|----------|
| **Render** | 750 hrs/month | ⭐ Recommended - Always on |
| **Railway** | $5 credits/month | Good alternative |
| **Vercel** | Unlimited | Frontend only |

---

## 🎉 Next Steps

1. **Deploy to Render** (takes 5 minutes)
2. **Get your public URL**
3. **Share with anyone** - works on all devices
4. **Access from your Android phone** anytime, anywhere!

### Your app will be live at:
`https://your-app-name.onrender.com`

**No Windows PC needed to run it anymore!** 🎊

---

## 📌 Important Notes

### Free Tier Limitations:
- Render free tier sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds to wake up
- After that, works normally

### To Keep Always Active (Paid):
- Upgrade to $7/month on Render
- App stays awake 24/7
- Better for production use

### For Academic Submission:
- Free tier is perfect for demo/testing
- Show the live URL in your presentation
- Accessible from any device globally

---

**Ready to deploy? Follow the Render steps above!** 🚀
