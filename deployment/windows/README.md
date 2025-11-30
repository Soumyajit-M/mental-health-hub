# Windows Deployment Package

## 📦 Available Packages

### 1. Portable Package (Recommended)
**File:** `MentalHealthHub-Portable-v2.2.0.zip` (2.75 MB)

**What's Included:**
- Complete application with all dependencies
- START.bat launcher
- README.txt with instructions
- All production node_modules

**System Requirements:**
- Windows 7/8/10/11 (64-bit)
- Node.js 14.0.0 or higher
- 50 MB free disk space

**How to Use:**
1. Extract the ZIP file anywhere
2. Double-click `START.bat`
3. Wait for "Server running on port 3001"
4. Open browser to http://localhost:3001

---

### 2. Standalone Executable
**File:** `MentalHealthHub.exe` (39.78 MB)

**What's Included:**
- Node.js v18.5.0 runtime bundled
- Application code embedded
- All dependencies packaged

**System Requirements:**
- Windows 7/8/10/11 (64-bit only)
- No Node.js installation needed!

**How to Use:**
1. Copy entire build folder
2. Double-click `START_APP.bat`
3. Or run `MentalHealthHub.exe` directly

**Note:** May have some module loading issues. Use Portable Package for best reliability.

---

## 🛠️ Development Tools

### create_portable.bat
Rebuilds the portable package from source.

**Usage:**
```cmd
create_portable.bat
```

Creates fresh `MentalHealthHub-Portable-v2.2.0.zip` with latest code.

### RUN_PORTABLE.bat
Quick launcher for development testing.

---

## 📋 User Instructions

For end users who receive the package:

### Quick Start:
1. **Download** the ZIP file
2. **Extract** to any folder (e.g., Desktop, Documents)
3. **Install Node.js** from https://nodejs.org/ (if not installed)
4. **Run** START.bat
5. **Open** http://localhost:3001 in your browser

### Troubleshooting:

**"Node is not recognized"**
- Install Node.js from https://nodejs.org/
- Restart your computer
- Try again

**"Port 3001 is already in use"**
- Close other applications using the port
- Or edit .env file and change PORT=3002

**Firewall Warning**
- Click "Allow access" when Windows Firewall asks
- This allows local access only

**Can't connect to localhost**
- Make sure you see "Server running on port 3001" in console
- Use http:// not https://
- Try http://127.0.0.1:3001

---

## 🎯 Distribution

### For Academic Submission:
Package as:
```
YourName_MentalHealthHub/
├── Executable/
│   └── MentalHealthHub-Portable-v2.2.0.zip
├── Documentation/
│   └── (your PDF and Word docs)
└── README.txt
```

### For Friends/Testers:
Just send:
- `MentalHealthHub-Portable-v2.2.0.zip`
- Brief instructions: "Extract and run START.bat"

---

## 🔒 Security

The portable package is safe:
- ✅ No malware or viruses
- ✅ Open source code
- ✅ Standard Node.js packages
- ✅ Runs locally on your machine
- ✅ No data sent to external servers (except AI API if configured)

---

## 📊 Package Contents

**MentalHealthHub-Portable-v2.2.0.zip** contains:
```
├── START.bat                  # Easy launcher
├── README.txt                 # User instructions
├── .env.example              # Configuration template
├── server.js                 # Main application
├── aiService.js              # AI integration
├── package.json              # Project config
├── public/                   # Web interface
│   ├── index.html
│   ├── app.js
│   └── styles.css
└── node_modules/             # All dependencies
    ├── express/
    ├── socket.io/
    ├── axios/
    └── (227 packages)
```

---

## ⚡ Performance

**Portable Package:**
- Startup time: 2-3 seconds
- Memory usage: ~50-70 MB
- Disk space: 15 MB extracted

**Standalone EXE:**
- Startup time: 3-5 seconds
- Memory usage: ~80-100 MB
- Disk space: 40 MB

---

## 🎓 Academic Use

Perfect for:
- ✅ Project demonstrations
- ✅ Semester submissions
- ✅ Portfolio showcases
- ✅ Peer testing
- ✅ Professor reviews

**Presentation Tip:**
1. Extract before presentation
2. Run START.bat
3. Open in browser
4. Show all features live
5. Keep console visible to show it's running locally

---

## 📞 Support

If users have issues:
1. Check README.txt in the package
2. Verify Node.js is installed
3. Check Windows Firewall settings
4. Try running as Administrator

---

**Ready to distribute!** 🎉

Just share the ZIP file and users can run it in minutes!
