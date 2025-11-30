# Project Structure

Mental Health Hub follows a clean, modular architecture with clear separation of concerns.

## Directory Structure

```
mental-health-hub/
├── src/                          # Backend source code
│   ├── config/                   # Configuration files
│   │   ├── config.js            # Application configuration
│   │   └── constants.js         # Constants and enums
│   ├── middleware/              # Express middleware
│   │   └── security.js          # Security headers & error handlers
│   ├── routes/                  # API route handlers
│   │   └── api.js               # REST API endpoints
│   ├── services/                # Business logic services
│   │   └── aiService.js         # AI chatbot service
│   ├── socket/                  # Socket.IO handlers
│   │   └── handlers.js          # Real-time event handlers
│   └── utils/                   # Utility functions
│       ├── logger.js            # Logging utilities
│       └── sanitizer.js         # Input sanitization
│
├── public/                      # Frontend static files
│   ├── css/                     # Stylesheets
│   │   └── styles.css           # Main styles with dark mode
│   ├── js/                      # Client-side JavaScript
│   │   ├── main.js              # Application entry point
│   │   ├── utils.js             # UI utilities & helpers
│   │   ├── theme.js             # Theme management
│   │   ├── chat.js              # Chat functionality
│   │   ├── forum.js             # Forum functionality
│   │   └── resources.js         # Resources display
│   └── index.html               # Main HTML file
│
├── server.js                    # Application entry point
├── package.json                 # Dependencies & scripts
├── .env                         # Environment variables
├── .env.example                 # Environment template
└── .gitignore                   # Git ignore rules
```

## Architecture Overview

### Backend Architecture

**Layered Architecture:**

- **Entry Point** (server.js): Initializes app, middleware, routes, and Socket.IO
- **Routes Layer** (src/routes/): Handles HTTP requests
- **Services Layer** (src/services/): Business logic and AI integration
- **Socket Layer** (src/socket/): Real-time WebSocket communication
- **Middleware Layer** (src/middleware/): Security, error handling, logging
- **Utilities** (src/utils/): Reusable helper functions

**Key Components:**

1. **Config Layer** (`src/config/`)

   - Centralized configuration management
   - Environment-based settings
   - Constants and enums

2. **API Routes** (`src/routes/api.js`)

   - GET /api/resources - Mental health resources
   - GET /api/chat/history - Message history
   - POST /api/feedback - User feedback
   - GET /api/stats - Platform statistics

3. **AI Service** (`src/services/aiService.js`)

   - 3-tier response system:
     1. Crisis detection (highest priority)
     2. Rule-based responses (fast, reliable)
     3. AI model responses (advanced, contextual)
   - Emergency resource delivery
   - Conversation context management

4. **Socket Handlers** (`src/socket/handlers.js`)
   - Connection/disconnection management
   - Chat message broadcasting
   - AI message processing
   - Typing indicators
   - Forum post handling

### Frontend Architecture

**Modular JavaScript:**

- Each module is self-contained with clear responsibilities
- Event-driven communication
- Centralized state management

**Module Breakdown:**

1. **Main App** (`js/main.js`)

   - Application initialization
   - Socket.IO setup
   - Module coordination
   - Navigation handling

2. **UI Utils** (`js/utils.js`)

   - Toast notifications
   - Loading states
   - Input validation
   - HTML escaping
   - Timestamp formatting

3. **Theme Manager** (`js/theme.js`)

   - Dark/light mode toggle
   - Theme persistence
   - Dynamic style updates

4. **Chat Manager** (`js/chat.js`)

   - Message sending/receiving
   - Chat history display
   - Typing indicators
   - AI chat interface

5. **Forum Manager** (`js/forum.js`)

   - Post creation
   - Reply handling
   - Like functionality
   - Post rendering

6. **Resources Manager** (`js/resources.js`)
   - Resource fetching
   - Resource display
   - Error handling

## Data Flow

### Chat Message Flow

```
User Input → ChatManager.sendMessage()
           → Socket.emit('chatMessage')
           → SocketHandlers.handleChatMessage()
           → Validation & Sanitization
           → Broadcast to all clients
           → ChatManager.displayMessage()
           → DOM Update
```

### AI Response Flow

```
User Input → ChatManager.sendAIMessage()
           → Socket.emit('aiMessage')
           → SocketHandlers.handleAIMessage()
           → AIService.getAIResponse()
           → Crisis Detection
           → Rule-Based / AI Model Response
           → Socket.emit('aiMessage')
           → ChatManager.displayAIMessage()
           → DOM Update
```

### Resource Loading Flow

```
Page Load → ResourcesManager.loadResources()
          → fetch('/api/resources')
          → API Route Handler
          → Send JSON response
          → ResourcesManager.renderResources()
          → DOM Update
```

## Security Layers

1. **Input Validation**

   - Length limits (500 chars for messages)
   - Content sanitization
   - Type checking

2. **Output Escaping**

   - HTML escaping for all user content
   - Safe URL handling
   - XSS prevention

3. **HTTP Security Headers**

   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block

4. **Error Handling**
   - Try-catch blocks throughout
   - Graceful degradation
   - User-friendly error messages

## Configuration Management

All configuration is centralized in `src/config/config.js`:

- Server settings (port, host, environment)
- Socket.IO settings (CORS, timeouts)
- AI service configuration (API keys, models)
- Chat settings (history limits)
- Forum settings (post limits)

Environment variables are loaded from `.env`:

```
PORT=3001
NODE_ENV=development
HUGGINGFACE_API_KEY=your_api_key_here
```

## Logging Strategy

Centralized logging through `src/utils/logger.js`:

- **Connection logs**: User connect/disconnect events
- **Message logs**: Chat and AI messages
- **AI logs**: AI responses and crisis detections
- **Error logs**: Exceptions and failures
- **Info logs**: General application events

## State Management

### Backend State

- `messageHistory`: Array of chat messages (max 100)
- `activeUsers`: Set of connected user IDs
- `typingUsers`: Map of users currently typing

### Frontend State

- `AppState`: Global application state
- `localStorage`: Theme preference, username
- Module instances maintain their own state

## Code Standards

1. **Naming Conventions**

   - Classes: PascalCase (e.g., `ChatManager`)
   - Functions: camelCase (e.g., `sendMessage`)
   - Constants: UPPER_SNAKE_CASE (e.g., `CRISIS_KEYWORDS`)
   - Files: camelCase (e.g., `aiService.js`)

2. **Documentation**

   - JSDoc comments for all classes and functions
   - Inline comments for complex logic
   - README files for major components

3. **Error Handling**

   - Always use try-catch for async operations
   - Log errors with context
   - Return user-friendly error messages

4. **Testing**
   - Manual testing for all features
   - Error scenario testing
   - Cross-browser compatibility

## Deployment Considerations

1. **Environment Setup**

   - Set `NODE_ENV=production`
   - Configure proper `PORT`
   - Set `CORS_ORIGIN` to your domain

2. **Security**

   - Use HTTPS in production
   - Set secure Socket.IO CORS settings
   - Use environment variables for secrets

3. **Performance**

   - Enable gzip compression
   - Minify CSS/JS in production
   - Use CDN for static assets

4. **Monitoring**
   - Log to file in production
   - Monitor error rates
   - Track user connection patterns

## Future Enhancements

Potential improvements to the architecture:

1. **Database Integration**

   - PostgreSQL for persistent storage
   - Message history persistence
   - User accounts and profiles

2. **Authentication**

   - JWT-based authentication
   - OAuth integration
   - Role-based access control

3. **Testing**

   - Unit tests (Jest)
   - Integration tests (Supertest)
   - E2E tests (Playwright)

4. **Build System**

   - Webpack for bundling
   - Babel for transpilation
   - CSS preprocessing (Sass/Less)

5. **API Enhancements**

   - RESTful API versioning
   - GraphQL endpoint
   - Rate limiting

6. **Real-time Features**
   - Private messaging
   - User presence indicators
   - Read receipts
