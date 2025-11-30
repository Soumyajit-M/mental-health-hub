# Mental Health Support Hub

> A professional, full-featured web application providing mental health support resources, real-time anonymous chat, and community forums with modern UI/UX.

## ✨ Features

### Core Features

- 🤖 **AI-Powered Support**: Intelligent chatbot provides immediate mental health support and guidance
- 📚 **Support Resources**: Curated crisis hotlines, therapy services, and support groups
- 💬 **Real-time Chat**: Anonymous support chat with typing indicators and online user count
- 🌐 **Community Forum**: Interactive forum with likes, sorting, and real-time updates
- ♿ **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatible
- 📱 **Responsive Design**: Mobile-first, works seamlessly on all devices

### AI Features

- 🧠 **Smart Responses**: Context-aware AI responses for mental health support
- 🚨 **Crisis Detection**: Automatically detects crisis keywords and provides emergency resources
- 💡 **Rule-Based Intelligence**: Pre-configured responses for anxiety, depression, stress, and loneliness
- 🎯 **Personalized Support**: AI adapts responses based on user input
- 📋 **Resource Recommendations**: Quick access to mental health resources on demand
- ⏱️ **Natural Timing**: Simulated typing delay for human-like interaction
- 🔄 **Fallback System**: Multiple response layers ensure always-helpful replies

### Professional Features

- 🎨 **Dark Mode**: Toggle between light and dark themes with localStorage persistence
- 🔔 **Toast Notifications**: Professional notification system for user feedback
- ⚡ **Loading States**: Smooth loading animations and transitions
- 🔄 **Auto-Reconnect**: Intelligent Socket.IO reconnection with user feedback
- 📊 **Live User Count**: See how many people are currently online
- ⌨️ **Typing Indicators**: Know when someone is typing in chat
- 🎯 **Character Counters**: Visual feedback for message and post length
- 💾 **Message Timestamps**: Relative time display (e.g., "5m ago")
- 🎭 **Smooth Animations**: Fade-in effects and micro-interactions
- 🔒 **Security**: XSS protection, input sanitization, security headers

## 🚀 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd mental-health-hub
```

2. Install dependencies:

```bash
npm install
```

3. Create environment configuration (optional):

```bash
cp .env.example .env
```

Edit `.env` to customize settings like PORT.

## Running Locally

Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3001` (or your configured PORT).

## Project Structure

```
mental-health-hub/
├── public/           # Frontend files
│   ├── index.html    # Main HTML page
│   ├── app.js        # Client-side JavaScript
│   └── styles.css    # Styling
├── server.js         # Express server with Socket.IO
├── package.json      # Dependencies and scripts
└── .env.example      # Environment variables template
```

## Deployment

### Deploy to Heroku

1. Install the Heroku CLI
2. Login to Heroku:

```bash
heroku login
```

3. Create a new Heroku app:

```bash
heroku create your-app-name
```

4. Deploy:

```bash
git push heroku main
```

5. Open your app:

```bash
heroku open
```

### Deploy to Render

1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Set PORT if needed (Render provides it automatically)
5. Click "Create Web Service"

### Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js and deploy
5. Add environment variables in the Variables tab if needed

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Follow the prompts

**Note**: For Vercel, you may need to configure it for Node.js server deployment.

## Environment Variables

- `PORT`: Server port (default: 3001)
- `CORS_ORIGIN`: CORS origin setting (default: \*)
- `NODE_ENV`: Environment (development/production)

## Security Features

- XSS Protection headers
- Input validation and sanitization
- Message length limits
- Secure Socket.IO configuration
- CORS configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your needs.

## Support Resources

If you're in crisis, please reach out:

- National Suicide Prevention Lifeline: 1-800-273-8255
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

## Acknowledgments

Built with:

- Express.js
- Socket.IO
- Vanilla JavaScript
