# Mental Health Hub - Deployment Structure

## 📁 Clean Organized Deployment

```
deployment/
├── windows/              # Windows PC Deployment
├── android-web/          # Mobile/Web Access
└── cloud/               # Cloud Hosting Deployment
```

---

## 💻 Windows Deployment

**Location:** `deployment/windows/`

### What's Inside:

- ✅ **MentalHealthHub-Portable-v2.2.0.zip** (2.75 MB)
  - Complete portable package
  - No installation needed (requires Node.js)
  - Double-click START.bat to run
- ✅ **MentalHealthHub.exe** (39.78 MB)

  - Standalone executable
  - Includes Node.js runtime
  - Direct run (has some dependency issues)

- ✅ **create_portable.bat**
  - Script to rebuild portable package
- ✅ **RUN_PORTABLE.bat**
  - Quick launcher for development

### How to Use (Windows):

1. Extract `MentalHealthHub-Portable-v2.2.0.zip`
2. Run `START.bat`
3. Open browser: http://localhost:3001

**System Requirements:**

- Windows 7/8/10/11 (64-bit)
- Node.js 14+ (for portable version)
- 50 MB disk space

---

## 📱 Android/Mobile Web Access

**Location:** `deployment/android-web/`

### What's Inside:

- ✅ **MOBILE_ACCESS.md**
  - Complete guide to access app on Android
  - Instructions for web-based access
  - How to add to home screen

### How to Use (Android):

**Option 1: Local Network Access**

1. Run app on Windows PC
2. Find PC's IP address
3. Access from phone: `http://192.168.x.x:3001`

**Option 2: Cloud Deployment** (Recommended)

1. Deploy to cloud (see cloud section)
2. Access from anywhere via URL
3. Add to Android home screen

**Features on Mobile:**

- ✅ Fully responsive design
- ✅ Touch-optimized interface
- ✅ All features work (chat, forum, AI)
- ✅ Dark mode support
- ✅ Works like native app

---

## ☁️ Cloud Deployment

**Location:** `deployment/cloud/`

### What's Inside:

- ✅ **Procfile** - Render/Railway configuration
- ✅ **vercel.json** - Vercel configuration
- ✅ **DEPLOYMENT_GUIDE.md** - Step-by-step deployment

### Supported Platforms:

**1. Render (Recommended)**

- Free 750 hours/month
- Auto HTTPS
- GitHub auto-deploy
- Perfect for demos

**2. Railway**

- $5 free credits/month
- Easy setup
- Good alternative

**3. Vercel**

- Unlimited frontend
- Needs serverless setup

### How to Deploy:

1. Sign up at https://render.com
2. Connect GitHub repository
3. Configure: Build=`npm install`, Start=`node server.js`
4. Deploy (2-3 minutes)
5. Get URL: `https://your-app.onrender.com`

**Access from Anywhere:**

- ✅ Android phones
- ✅ iPhones
- ✅ Tablets
- ✅ Any device with browser
- ✅ Works globally

---

## 📊 Deployment Comparison

| Method               | Platform | Size     | Requirements | Best For        |
| -------------------- | -------- | -------- | ------------ | --------------- |
| **Windows Portable** | PC       | 2.75 MB  | Node.js      | Local testing   |
| **Windows EXE**      | PC       | 39.78 MB | None         | Standalone demo |
| **Android Web**      | Mobile   | N/A      | Browser      | Mobile access   |
| **Cloud**            | Any      | N/A      | Internet     | Production use  |

---

## 🎯 Recommended Usage

### For Academic Submission:

```
✅ Source Code (main repository)
✅ Windows Portable Package (deployment/windows/)
✅ Documentation (PDF + Word)
✅ Cloud Deployment URL (optional but impressive)
```

### For Personal Use:

```
✅ Cloud Deployment (access from anywhere)
✅ Android home screen bookmark
✅ Share URL with friends
```

### For Demo/Presentation:

```
✅ Cloud deployment (show live URL)
✅ Access on phone during demo
✅ Windows portable as backup
```

---

## 📦 What to Submit

### Complete Submission Package:

```
MentalHealthHub_Submission/
├── 1_Source_Code/
│   ├── server.js
│   ├── aiService.js
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── 2_Documentation/
│   ├── Mental_Health_Hub_Documentation.pdf (2.91 MB)
│   └── Mental_Health_Hub_Documentation.docx (109.6 KB)
│
├── 3_Windows_Executable/
│   └── MentalHealthHub-Portable-v2.2.0.zip (2.75 MB)
│
├── 4_Deployment_Info/
│   ├── Cloud_URL.txt (your deployed URL)
│   └── Mobile_Access_Guide.md
│
└── README.txt (overview of submission)
```

---

## 🚀 Quick Start Guide

### For Windows Users:

1. Go to `deployment/windows/`
2. Extract `MentalHealthHub-Portable-v2.2.0.zip`
3. Run `START.bat`

### For Android Users:

1. Read `deployment/android-web/MOBILE_ACCESS.md`
2. Access via cloud URL or local network
3. Add to home screen

### For Cloud Deployment:

1. Check `deployment/cloud/DEPLOYMENT_GUIDE.md`
2. Deploy to Render/Railway
3. Share URL globally

---

## 📂 Directory Structure

```
mental-health-hub/
├── deployment/
│   ├── windows/
│   │   ├── MentalHealthHub-Portable-v2.2.0.zip
│   │   ├── MentalHealthHub.exe
│   │   ├── create_portable.bat
│   │   └── RUN_PORTABLE.bat
│   │
│   ├── android-web/
│   │   └── MOBILE_ACCESS.md
│   │
│   └── cloud/
│       ├── Procfile
│       ├── vercel.json
│       └── DEPLOYMENT_GUIDE.md
│
├── docs/
│   ├── Mental_Health_Hub_Documentation.pdf
│   └── Mental_Health_Hub_Documentation.docx
│
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── server.js
├── aiService.js
├── package.json
└── README.md
```

---

## ✅ All Deployment Options Ready!

- ✅ Windows PC deployment
- ✅ Android/Mobile web access
- ✅ Cloud hosting ready
- ✅ All documentation included
- ✅ Clean organized structure

**Choose the deployment method that works best for you!** 🎉

---

**Version:** 2.2.0  
**Last Updated:** November 30, 2025  
**Repository:** https://github.com/Soumyajit-M/mental-health-hub
