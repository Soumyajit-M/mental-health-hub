# 3.8 Data Models and UML Diagrams

## 3.8.1 Introduction

This section presents the comprehensive data models and Unified Modeling Language (UML) diagrams that define the structure, behavior, and interactions within the Mental Health Hub platform. These diagrams provide a visual representation of the system architecture, data relationships, and process flows.

## 3.8.2 Use Case Diagram

The use case diagram illustrates the interactions between users and the Mental Health Hub system, showing the primary functionalities available.

```
┌─────────────────────────────────────────────────────────────┐
│                  Mental Health Hub System                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   [Access Platform]                                   │  │
│  │         │                                            │  │
│  │         ├──> [View Welcome Message]                  │  │
│  │         │                                            │  │
│  │         ├──> [Start Chat Session]                    │  │
│  │         │          │                                 │  │
│  │         │          ├──> [Send Message]               │  │
│  │         │          │                                 │  │
│  │         │          ├──> [Receive AI Response]        │  │
│  │         │          │                                 │  │
│  │         │          └──> [View Chat History]          │  │
│  │         │                                            │  │
│  │         ├──> [Access Crisis Resources]               │  │
│  │         │          │                                 │  │
│  │         │          ├──> [View Hotline Numbers]       │  │
│  │         │          │                                 │  │
│  │         │          └──> [View Emergency Contacts]    │  │
│  │         │                                            │  │
│  │         ├──> [Clear Chat History]                    │  │
│  │         │                                            │  │
│  │         └──> [Reconnect After Disconnect]            │  │
│  │                                                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  External System:                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  [Hugging Face AI Service]                            │  │
│  │         ↑                                             │  │
│  │         │ <<extends>>                                 │  │
│  │  [Generate AI Response]                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

         User
          │
          │ <<actor>>
          │
          ▼
```

**Use Case Descriptions:**

| Use Case                   | Description                                                | Priority |
| -------------------------- | ---------------------------------------------------------- | -------- |
| Access Platform            | User opens the Mental Health Hub website                   | Critical |
| Start Chat Session         | Initialize WebSocket connection for real-time chat         | Critical |
| Send Message               | User sends a message to the AI assistant                   | Critical |
| Receive AI Response        | System processes message and returns AI-generated response | Critical |
| View Chat History          | Display previous messages in the conversation              | High     |
| Access Crisis Resources    | View emergency mental health resources                     | Critical |
| Clear Chat History         | Remove all messages from current session                   | Medium   |
| Reconnect After Disconnect | Automatically reconnect WebSocket on connection loss       | High     |

## 3.8.3 Class Diagram

The class diagram shows the object-oriented structure of the Mental Health Hub system, including classes, attributes, methods, and relationships.

```
┌─────────────────────────────────────┐
│         Server                      │
├─────────────────────────────────────┤
│ - app: Express                      │
│ - httpServer: HTTP.Server           │
│ - io: Socket.IO.Server              │
│ - port: number                      │
├─────────────────────────────────────┤
│ + initialize(): void                │
│ + setupMiddleware(): void           │
│ + setupRoutes(): void               │
│ + setupSocketIO(): void             │
│ + start(): void                     │
└─────────────────────────────────────┘
              │
              │ 1
              │
              │ *
              ▼
┌─────────────────────────────────────┐         ┌─────────────────────────────────────┐
│      SocketConnection               │         │         AIService                   │
├─────────────────────────────────────┤         ├─────────────────────────────────────┤
│ - socket: Socket                    │         │ - apiUrl: string                    │
│ - sessionId: string                 │         │ - apiKey: string                    │
│ - isConnected: boolean              │         │ - model: string                     │
│ - messageHistory: Message[]         │         │ - maxRetries: number                │
├─────────────────────────────────────┤         ├─────────────────────────────────────┤
│ + onConnect(): void                 │         │ + generateResponse(msg): Promise    │
│ + onDisconnect(): void              │◆────────│ + validateInput(msg): boolean       │
│ + onMessage(data): void             │   uses  │ + sanitizeInput(msg): string        │
│ + sendResponse(data): void          │         │ + handleAPIError(err): Error        │
│ + handleError(error): void          │         │ + retryRequest(msg, n): Promise     │
└─────────────────────────────────────┘         └─────────────────────────────────────┘
              │                                              │
              │                                              │
              │ creates                                      │ uses
              │                                              │
              ▼                                              ▼
┌─────────────────────────────────────┐         ┌─────────────────────────────────────┐
│          Message                    │         │      HuggingFaceAPI                 │
├─────────────────────────────────────┤         ├─────────────────────────────────────┤
│ - id: string                        │         │ - endpoint: string                  │
│ - content: string                   │         │ - headers: object                   │
│ - sender: 'user' | 'ai'             │         │ - timeout: number                   │
│ - timestamp: Date                   │         ├─────────────────────────────────────┤
│ - sessionId: string                 │         │ + post(data): Promise<Response>     │
├─────────────────────────────────────┤         │ + get(): Promise<Response>          │
│ + format(): string                  │         │ + authenticate(): boolean           │
│ + validate(): boolean               │         └─────────────────────────────────────┘
│ + sanitize(): void                  │
│ + toJSON(): object                  │
└─────────────────────────────────────┘
              ▲
              │
              │ contains
              │
┌─────────────────────────────────────┐
│       ChatSession                   │
├─────────────────────────────────────┤
│ - sessionId: string                 │
│ - messages: Message[]               │
│ - startTime: Date                   │
│ - isActive: boolean                 │
├─────────────────────────────────────┤
│ + addMessage(msg): void             │
│ + getHistory(): Message[]           │
│ + clearHistory(): void              │
│ + endSession(): void                │
└─────────────────────────────────────┘


┌─────────────────────────────────────┐
│       ClientApp                     │
├─────────────────────────────────────┤
│ - socket: SocketIOClient            │
│ - ui: UIController                  │
│ - messageHistory: Message[]         │
├─────────────────────────────────────┤
│ + initialize(): void                │
│ + connectToServer(): void           │
│ + sendMessage(msg): void            │
│ + displayMessage(msg): void         │
│ + handleDisconnect(): void          │
│ + clearChat(): void                 │
└─────────────────────────────────────┘
              │
              │ uses
              │
              ▼
┌─────────────────────────────────────┐
│       UIController                  │
├─────────────────────────────────────┤
│ - chatMessages: HTMLElement         │
│ - messageInput: HTMLElement         │
│ - sendButton: HTMLElement           │
│ - statusIndicator: HTMLElement      │
├─────────────────────────────────────┤
│ + renderMessage(msg): void          │
│ + updateStatus(status): void        │
│ + showTypingIndicator(): void       │
│ + hideTypingIndicator(): void       │
│ + scrollToBottom(): void            │
│ + enableInput(): void               │
│ + disableInput(): void              │
└─────────────────────────────────────┘
```

**Class Relationships:**

- **Server** (1) → (\*) **SocketConnection**: One server manages multiple socket connections
- **SocketConnection** (◆) → **AIService**: Socket connection uses AI service (composition)
- **AIService** → **HuggingFaceAPI**: AI service uses external API
- **SocketConnection** creates **Message**: Each message is created per connection
- **ChatSession** contains **Message**: Session maintains message history
- **ClientApp** uses **UIController**: Client app controls UI elements

## 3.8.4 Sequence Diagram - Chat Message Flow

This sequence diagram illustrates the flow of a typical chat interaction from user input to AI response.

```
User          Browser       ClientApp     WebSocket     Server      AIService    HuggingFace
 │               │              │             │            │             │             │
 │ Type message  │              │             │            │             │             │
 │──────────────>│              │             │            │             │             │
 │               │              │             │            │             │             │
 │ Click Send    │              │             │            │             │             │
 │──────────────>│              │             │            │             │             │
 │               │              │             │            │             │             │
 │               │ sendMessage()│             │            │             │             │
 │               │─────────────>│             │            │             │             │
 │               │              │             │            │             │             │
 │               │              │ emit('chat')│            │             │             │
 │               │              │────────────>│            │             │             │
 │               │              │             │            │             │             │
 │               │              │             │ on('chat') │             │             │
 │               │              │             │───────────>│             │             │
 │               │              │             │            │             │             │
 │               │              │             │            │ validate()  │             │
 │               │              │             │            │────────────>│             │
 │               │              │             │            │             │             │
 │               │              │             │            │ sanitize()  │             │
 │               │              │             │            │────────────>│             │
 │               │              │             │            │             │             │
 │               │              │             │            │ generateResponse()        │
 │               │              │             │            │────────────>│             │
 │               │              │             │            │             │             │
 │               │              │             │            │             │ POST request│
 │               │              │             │            │             │────────────>│
 │               │              │             │            │             │             │
 │               │              │             │            │             │   Process   │
 │               │              │             │            │             │     AI      │
 │               │              │             │            │             │             │
 │               │              │             │            │             │  Response   │
 │               │              │             │            │             │<────────────│
 │               │              │             │            │<────────────│             │
 │               │              │             │            │             │             │
 │               │              │             │ emit('response')         │             │
 │               │              │<────────────│────────────│             │             │
 │               │              │             │            │             │             │
 │               │ displayMsg() │             │            │             │             │
 │               │<─────────────│             │            │             │             │
 │               │              │             │            │             │             │
 │  View Response│              │             │            │             │             │
 │<──────────────│              │             │            │             │             │
 │               │              │             │            │             │             │
```

**Sequence Steps:**

1. User types message in browser input field
2. User clicks send button
3. ClientApp calls sendMessage() function
4. Message emitted via WebSocket connection
5. Server receives message through socket event listener
6. Server validates and sanitizes input
7. AIService generates response using Hugging Face API
8. External API processes the request
9. Response returned to AIService
10. Server emits response back through WebSocket
11. ClientApp receives response and displays it
12. User sees AI response in chat interface

## 3.8.5 Sequence Diagram - Connection Establishment

```
Browser      ClientApp     WebSocket     Server      SocketIO
  │              │             │            │            │
  │ Page Load    │             │            │            │
  │─────────────>│             │            │            │
  │              │             │            │            │
  │              │ initialize()│            │            │
  │              │────────────>│            │            │
  │              │             │            │            │
  │              │ io.connect()│            │            │
  │              │────────────>│            │            │
  │              │             │            │            │
  │              │             │ Connection │            │
  │              │             │───────────>│            │
  │              │             │            │            │
  │              │             │            │ on('connection')
  │              │             │            │───────────>│
  │              │             │            │            │
  │              │             │            │ Assign socketId
  │              │             │            │            │
  │              │             │   Connected│            │
  │              │<────────────│<───────────│<───────────│
  │              │             │            │            │
  │              │ updateUI()  │            │            │
  │<─────────────│             │            │            │
  │              │             │            │            │
  │ Status: Connected         │            │            │
  │              │             │            │            │
```

## 3.8.6 Activity Diagram - User Chat Workflow

```
                    START
                      │
                      ▼
              ┌───────────────┐
              │  Access Site  │
              └───────────────┘
                      │
                      ▼
              ┌───────────────┐
              │ View Welcome  │
              └───────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ WebSocket Connected?   │
         └────────────────────────┘
                │           │
               Yes          No
                │           │
                │           ▼
                │    ┌─────────────┐
                │    │Retry Connect│
                │    └─────────────┘
                │           │
                │           ▼
                │    ┌─────────────┐
                │    │   Success?  │
                │    └─────────────┘
                │        │      │
                │       Yes     No
                │        │      │
                │        │      ▼
                │        │   ┌──────────────┐
                │        │   │Show Error Msg│
                │        │   └──────────────┘
                │        │         │
                │        │         ▼
                │        │       END
                │        │
                ▼        │
         ┌──────┴────────┘
         │
         ▼
  ┌─────────────┐
  │Enter Message│
  └─────────────┘
         │
         ▼
  ┌─────────────┐
  │Message Empty│ ────Yes───> ┌──────────┐
  └─────────────┘             │Show Alert│
         │                    └──────────┘
         No                         │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │ Send Message│                  │
  └─────────────┘                  │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │Display User │                  │
  │   Message   │                  │
  └─────────────┘                  │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │Show Typing  │                  │
  │  Indicator  │                  │
  └─────────────┘                  │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │Wait for AI  │                  │
  │  Response   │                  │
  └─────────────┘                  │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │ Response    │                  │
  │ Received?   │                  │
  └─────────────┘                  │
      │      │                     │
     Yes     No                    │
      │      │                     │
      │      ▼                     │
      │   ┌─────────┐              │
      │   │ Timeout │              │
      │   └─────────┘              │
      │      │                     │
      │      ▼                     │
      │   ┌──────────┐             │
      │   │Show Error│             │
      │   └──────────┘             │
      │                            │
      ▼                            │
  ┌─────────────┐                  │
  │Display AI   │                  │
  │  Response   │                  │
  └─────────────┘                  │
         │                          │
         ▼                          │
  ┌─────────────┐                  │
  │Continue     │ ──Yes──> ┌───────┘
  │Chatting?    │
  └─────────────┘
         │
         No
         │
         ▼
  ┌─────────────┐
  │Clear Chat?  │
  └─────────────┘
      │      │
     Yes     No
      │      │
      ▼      │
  ┌────────┐ │
  │ Clear  │ │
  │History │ │
  └────────┘ │
      │      │
      └──────┘
         │
         ▼
       END
```

## 3.8.7 Activity Diagram - AI Response Generation

```
                 START
                   │
                   ▼
         ┌──────────────────┐
         │ Receive User Msg │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │  Validate Input  │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │    Valid Input?  │
         └──────────────────┘
              │         │
             Yes        No
              │         │
              │         ▼
              │    ┌─────────────┐
              │    │Return Error │
              │    └─────────────┘
              │         │
              │         ▼
              │       END
              │
              ▼
         ┌──────────────────┐
         │ Sanitize Input   │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │  Build API Req   │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │ Send to HF API   │
         └──────────────────┘
                   │
                   ▼
         ┌──────────────────┐
         │  API Response?   │
         └──────────────────┘
           │              │
       Success          Error
           │              │
           │              ▼
           │      ┌──────────────┐
           │      │ Retry Count  │
           │      │   < Max?     │
           │      └──────────────┘
           │          │       │
           │         Yes      No
           │          │       │
           │          │       ▼
           │          │  ┌─────────────┐
           │          │  │Return Fallbk│
           │          │  │  Message    │
           │          │  └─────────────┘
           │          │       │
           │          ▼       │
           │      ┌────────┐  │
           │      │Wait 1s │  │
           │      └────────┘  │
           │          │       │
           │          ▼       │
           │      ┌────────┐  │
           │      │ Retry  │  │
           │      └────────┘  │
           │          │       │
           │          └───────┘
           │                  │
           ▼                  │
    ┌─────────────┐           │
    │Parse Response           │
    └─────────────┘           │
           │                  │
           ▼                  │
    ┌─────────────┐           │
    │ Extract Text│           │
    └─────────────┘           │
           │                  │
           ▼                  │
    ┌─────────────┐           │
    │Validate Resp│           │
    └─────────────┘           │
           │                  │
           ▼                  │
    ┌─────────────┐           │
    │Return to Usr│<──────────┘
    └─────────────┘
           │
           ▼
         END
```

## 3.8.8 Entity-Relationship Diagram

While the Mental Health Hub does not use a persistent database, the in-memory data relationships can be represented as follows:

```
┌─────────────────────────┐
│      SocketConnection   │
├─────────────────────────┤
│ PK: socketId (String)   │
│     connectedAt (Date)  │
│     isActive (Boolean)  │
│     ipAddress (String)  │
└─────────────────────────┘
            │
            │ 1
            │
            │ Has
            │
            │ 1
            ▼
┌─────────────────────────┐
│      ChatSession        │
├─────────────────────────┤
│ PK: sessionId (String)  │
│ FK: socketId (String)   │
│     startTime (Date)    │
│     lastActivity (Date) │
│     isActive (Boolean)  │
└─────────────────────────┘
            │
            │ 1
            │
            │ Contains
            │
            │ *
            ▼
┌─────────────────────────┐
│        Message          │
├─────────────────────────┤
│ PK: messageId (String)  │
│ FK: sessionId (String)  │
│     content (String)    │
│     sender (Enum)       │
│     timestamp (Date)    │
│     status (String)     │
└─────────────────────────┘


┌─────────────────────────┐
│      AIRequest          │
├─────────────────────────┤
│ PK: requestId (String)  │
│ FK: messageId (String)  │
│     prompt (String)     │
│     model (String)      │
│     timestamp (Date)    │
│     responseTime (Int)  │
└─────────────────────────┘
            │
            │ 1
            │
            │ Generates
            │
            │ 1
            ▼
┌─────────────────────────┐
│      AIResponse         │
├─────────────────────────┤
│ PK: responseId (String) │
│ FK: requestId (String)  │
│     text (String)       │
│     confidence (Float)  │
│     timestamp (Date)    │
│     status (String)     │
└─────────────────────────┘
```

**Entity Descriptions:**

| Entity           | Description                            | Cardinality               |
| ---------------- | -------------------------------------- | ------------------------- |
| SocketConnection | Represents active WebSocket connection | -                         |
| ChatSession      | Represents user chat session           | 1:1 with SocketConnection |
| Message          | Individual chat messages               | Many:1 with ChatSession   |
| AIRequest        | AI API request details                 | 1:1 with Message          |
| AIResponse       | AI-generated response                  | 1:1 with AIRequest        |

**Relationships:**

- One SocketConnection has one ChatSession
- One ChatSession contains many Messages
- One Message triggers one AIRequest
- One AIRequest generates one AIResponse

## 3.8.9 State Diagram - WebSocket Connection States

```
                    ┌────────────────┐
                    │  DISCONNECTED  │
                    └────────────────┘
                            │
                            │ connect()
                            ▼
                    ┌────────────────┐
                    │   CONNECTING   │
                    └────────────────┘
                       │          │
            success    │          │ error
                       │          │
                       ▼          ▼
            ┌────────────────┐  ┌────────────────┐
            │   CONNECTED    │  │ CONNECTION_ERR │
            └────────────────┘  └────────────────┘
                       │                  │
         ┌─────────────┼─────────────┐    │ retry
         │             │             │    │
   send_msg()    disconnect()   error    ▼
         │             │             │  ┌────────────┐
         ▼             ▼             │  │ RECONNECT  │
  ┌────────────┐ ┌──────────┐       │  └────────────┘
  │  SENDING   │ │DISCONNECT│       │         │
  └────────────┘ │   ING    │       │         │
         │       └──────────┘       │         │
         │             │            │         │
    response          │             │    reconnect
      recv            │             │         │
         │            │             │         │
         ▼            ▼             ▼         │
  ┌────────────┐ ┌────────────┐ ┌──────────┐ │
  │  WAITING   │ │DISCONNECTED│ │  ERROR   │ │
  │ _RESPONSE  │ └────────────┘ └──────────┘ │
  └────────────┘                      │       │
         │                            │       │
         │ timeout                    │       │
         ▼                            │       │
  ┌────────────┐                      │       │
  │  TIMEOUT   │──────────────────────┘       │
  └────────────┘                              │
         │                                    │
         │ retry                              │
         └────────────────────────────────────┘
```

**State Descriptions:**

| State            | Description                             | Triggers                      |
| ---------------- | --------------------------------------- | ----------------------------- |
| DISCONNECTED     | Initial state, no connection            | -                             |
| CONNECTING       | Attempting to establish connection      | connect() called              |
| CONNECTED        | Active WebSocket connection established | Connection successful         |
| CONNECTION_ERR   | Failed to establish connection          | Connection failed             |
| RECONNECT        | Attempting automatic reconnection       | Connection dropped            |
| SENDING          | Message being transmitted               | send_msg() called             |
| WAITING_RESPONSE | Waiting for AI response                 | Message sent successfully     |
| DISCONNECTING    | Gracefully closing connection           | disconnect() called           |
| TIMEOUT          | Response timeout exceeded               | No response within time limit |
| ERROR            | Error state requiring intervention      | Critical error occurred       |

## 3.8.10 Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Environment                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Presentation Layer                     │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │  index.html  │  │  styles.css  │  │  UI Elements │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  └────────────────────────────────┬─────────────────────────┘  │
│                                   │                             │
│  ┌────────────────────────────────┼─────────────────────────┐  │
│  │              Application Layer │                         │  │
│  │                                                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │   app.js     │  │ utils.js     │  │Socket.IO     │   │  │
│  │  │   (Main)     │──│ (Helpers)    │  │   Client     │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  └───────────────────────────────────────────┬──────────────┘  │
└────────────────────────────────────────────────│─────────────────┘
                                               │
                                        WebSocket (WSS)
                                               │
┌──────────────────────────────────────────────┼──────────────────┐
│                      Server Environment      │                  │
│                                              │                  │
│  ┌───────────────────────────────────────────┼──────────────┐  │
│  │                 Communication Layer       │              │  │
│  │                                           │              │  │
│  │  ┌──────────────┐                         │              │  │
│  │  │  Socket.IO   │◄────────────────────────┘              │  │
│  │  │   Server     │                                        │  │
│  │  └──────────────┘                                        │  │
│  └───────────────────┬───────────────────────────────────────┘  │
│                      │                                          │
│  ┌───────────────────┼───────────────────────────────────────┐  │
│  │          Application Layer                                │  │
│  │                  │                                        │  │
│  │  ┌───────────────▼────────┐  ┌──────────────┐            │  │
│  │  │     server.js          │  │ Express.js   │            │  │
│  │  │  (Main Server Logic)   │──│  Framework   │            │  │
│  │  └────────────────────────┘  └──────────────┘            │  │
│  └──────────────────────┬────────────────────────────────────┘  │
│                         │                                       │
│  ┌──────────────────────┼────────────────────────────────────┐  │
│  │           Business Logic Layer                            │  │
│  │                     │                                     │  │
│  │  ┌──────────────────▼─────────┐  ┌──────────────────┐    │  │
│  │  │    aiService.js            │  │  Input           │    │  │
│  │  │ (AI Integration)           │──│  Validation      │    │  │
│  │  └────────────────────────────┘  └──────────────────┘    │  │
│  └──────────────────────┬────────────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────────────┘
                          │
                    HTTPS/REST API
                          │
┌─────────────────────────┼───────────────────────────────────────┐
│              External Services                                  │
│                         │                                       │
│  ┌──────────────────────▼────────────────────────────────────┐  │
│  │          Hugging Face Inference API                       │  │
│  │                                                            │  │
│  │  ┌──────────────────────────────────────────────────┐    │  │
│  │  │   BlenderBot Model (facebook/blenderbot-400M)     │    │  │
│  │  └──────────────────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 3.8.11 Deployment Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       Client Device                             │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Web Browser                                  │  │
│  │  (Chrome, Firefox, Edge, Safari)                          │  │
│  │                                                            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │         Mental Health Hub Web App                   │ │  │
│  │  │  - HTML/CSS/JavaScript                              │ │  │
│  │  │  - Socket.IO Client                                 │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬────────────────────────────────────┘
                              │
                    HTTPS/WSS over Internet
                              │
┌─────────────────────────────┼────────────────────────────────────┐
│                       VPS/Cloud Server                           │
│                  (Ubuntu 22.04 LTS)                              │
│                             │                                    │
│  ┌──────────────────────────┼─────────────────────────────────┐ │
│  │              Reverse Proxy (Optional)                      │ │
│  │                    Nginx                                   │ │
│  │  - SSL/TLS Termination                                     │ │
│  │  - Load Balancing                                          │ │
│  │  - Static File Serving                                     │ │
│  └──────────────────────────┬─────────────────────────────────┘ │
│                             │                                   │
│  ┌──────────────────────────┼─────────────────────────────────┐ │
│  │              Node.js Runtime                               │ │
│  │              (v18.17.0 LTS)                                │ │
│  │                           │                                │ │
│  │  ┌────────────────────────▼──────────────────────────────┐ │ │
│  │  │         Mental Health Hub Server                      │ │ │
│  │  │                                                        │ │ │
│  │  │  Components:                                          │ │ │
│  │  │  - Express.js Web Server                              │ │ │
│  │  │  - Socket.IO Server                                   │ │ │
│  │  │  - AI Service Module                                  │ │ │
│  │  │  - Static File Server                                 │ │ │
│  │  │                                                        │ │ │
│  │  │  Port: 3001 (or configured)                           │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 File System                               │  │
│  │                                                            │  │
│  │  /app/                                                     │  │
│  │    ├── server.js                                          │  │
│  │    ├── aiService.js                                       │  │
│  │    ├── public/                                            │  │
│  │    │   ├── index.html                                     │  │
│  │    │   ├── app.js                                         │  │
│  │    │   └── styles.css                                     │  │
│  │    ├── .env (environment variables)                       │  │
│  │    └── node_modules/                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬────────────────────────────────────┘
                              │
                      HTTPS REST API
                              │
┌─────────────────────────────┼────────────────────────────────────┐
│                  Hugging Face Cloud                              │
│                             │                                    │
│  ┌──────────────────────────▼─────────────────────────────────┐ │
│  │           Inference API                                     │ │
│  │                                                              │ │
│  │  Model: facebook/blenderbot-400M-distill                   │ │
│  │  Endpoint: https://api-inference.huggingface.co            │ │
│  │                                                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 3.8.12 Summary

The data models and UML diagrams presented in this section provide a comprehensive visual representation of the Mental Health Hub system architecture. These diagrams illustrate:

1. **Use Case Diagram**: User interactions and system functionalities
2. **Class Diagram**: Object-oriented structure with 9 core classes and their relationships
3. **Sequence Diagrams**: Message flow patterns for chat and connection establishment
4. **Activity Diagrams**: User workflows and AI response generation process
5. **Entity-Relationship Diagram**: In-memory data relationships
6. **State Diagram**: WebSocket connection state transitions (10 states)
7. **Component Diagram**: System architecture across 3 layers (presentation, application, business logic)
8. **Deployment Diagram**: Physical deployment architecture across client, server, and external services

These diagrams serve as the foundation for system implementation and provide clear documentation for future development and maintenance.

---

**Key Architectural Patterns:**

- **Client-Server Architecture**: Clear separation between frontend and backend
- **Event-Driven Design**: WebSocket-based real-time communication
- **Layered Architecture**: Presentation, application, and business logic layers
- **Service-Oriented**: External AI service integration via REST API
- **Stateless Server**: No persistent session storage for privacy
