const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableCell, TableRow, WidthType } = require('docx');

const doc = new Document({
    sections: [{
        properties: {
            page: {
                size: {
                    width: 11906, // A4 width in twips (8.27 inches * 1440)
                    height: 16838, // A4 height in twips (11.69 inches * 1440)
                },
                margin: {
                    top: 1440, // 1 inch
                    bottom: 1440,
                    left: 2160, // 1.5 inches
                    right: 1440,
                },
            },
        },
        children: [
            new Paragraph({
                text: "Mental Health Support Hub Synopsis Report",
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                text: "1. Introduction and Objectives of the Project",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "The Mental Health Support Hub is a web-based application designed to provide accessible mental health resources and support to users. The project aims to create a centralized platform where individuals can access crisis hotlines, online therapy options, support groups, and engage in anonymous chat and community forums. The primary objectives include promoting mental health awareness, reducing stigma, and offering immediate support through real-time interactions. This application serves as a bridge between users and professional resources, fostering a supportive community environment.",
                        font: "Times New Roman",
                        size: 24, // 12pt
                    }),
                ],
            }),
            new Paragraph({
                text: "2. Tools/Platform, Hardware and Software Requirement Specifications",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Platform: Web-based application using Node.js for the backend and vanilla JavaScript for the frontend.\n- Software Requirements:\n  - Node.js (version 14 or higher)\n  - Express.js framework for server-side routing\n  - Socket.io for real-time communication\n  - HTML5, CSS3, and JavaScript for client-side development\n  - Development tools: VS Code or similar IDE\n- Hardware Requirements:\n  - Minimum: 4GB RAM, 2-core CPU, 10GB storage\n  - Recommended: 8GB RAM, 4-core CPU, 20GB storage for development and deployment\n- Dependencies: Express (^4.18.2), Socket.io (^4.7.2)",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "3. Problem Definition, Requirement Specifications (Detailed Functional Requirements and Technical Specifications), Project Planning and Scheduling (Gantt chart and PERT chart)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Problem Definition: Many individuals face barriers to accessing mental health support due to stigma, lack of awareness, or geographical limitations. Existing platforms may not offer real-time anonymous interaction or integrated resources.\n- Functional Requirements:\n  - Display support resources (hotlines, therapy links, groups)\n  - Enable anonymous real-time chat support\n  - Provide a community forum for sharing experiences\n  - Load and display resources and chat history via API\n- Technical Specifications:\n  - Backend: RESTful APIs for resources and chat data; WebSocket for real-time messaging\n  - Frontend: Responsive UI with sections for resources, chat, and forum\n  - Data Storage: In-memory arrays (simulated; can be extended to databases)\n- Project Planning and Scheduling:\n  - Gantt Chart: Week 1-2: Setup and backend development; Week 3-4: Frontend development; Week 5: Testing and deployment.\n  - PERT Chart: Critical path includes backend API setup (duration: 1 week), frontend integration (1 week), and testing (0.5 weeks).",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "4. Analysis (Data Models like 0, 1 and 2 level DFDs, Complete ER Diagrams with cardinality, Class Diagrams etc. as per the project requirements)",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Data Flow Diagrams (DFDs):\n  - Level 0: User interacts with the hub to access resources and chat; data flows from server to client.\n  - Level 1: Subprocesses include fetching resources, sending messages, and posting to forum.\n  - Level 2: Detailed flows for API calls and Socket.io events.\n- ER Diagram: Entities: User (attributes: ID, messages), Resource (ID, title, description, contact/link). Relationships: User posts messages (1:N), Resources are static.\n- Class Diagram: Classes: Server (methods: handleConnections), Client (methods: loadResources, sendMessage).",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "Figure 1: Level 0 DFD",
                alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
                text: "[Diagram description: External entity (User) -> Process (Hub Application) -> Data Store (Resources/Chat)]",
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "[Diagram description: External entity (User) -> Process (Hub Application) -> Data Store (Resources/Chat)]",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "5. A complete structure which includes:",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "a. Number of modules and their description to provide estimation of the student's effort on the project. Along with process logic of each Module.\n  - Module 1: Backend Server (Express setup, API endpoints) - Effort: 40%\n  - Module 2: Real-time Chat (Socket.io integration) - Effort: 30%\n  - Module 3: Frontend UI (HTML/CSS/JS for resources, chat, forum) - Effort: 30%\nb. Data Structures as per the project requirements for all the modules.\n  - Resources: Array of objects {id, title, description, contact?, link?}\n  - Chat Messages: Array of objects {text, isOwn}\nc. Process Logic of each module.\n  - Backend: Initialize server, register routes, handle Socket connections.\n  - Chat: Emit messages on newMessage event, update all clients.\n  - Frontend: Fetch data on load, handle form submissions, update DOM.\nd. Process Logic of each module. (Repeated as per guidelines; same as c.)\ne. List of reports that are likely to be generated.\n  - Resource List Report: Displays available support resources.\n  - Chat History Report: Logs of anonymous messages.\n  - Forum Posts Report: User-generated community content.",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "6. Proposed security mechanisms at various levels",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Application Level: Input validation on forms to prevent XSS; rate limiting on chat messages.\n- Network Level: HTTPS for secure data transmission.\n- Data Level: Anonymity in chat; no persistent user data storage without consent.\n- Access Control: Public access with no authentication for basic features; future admin roles for moderation.",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "7. Future scope and further enhancement of the project",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Integrate user authentication for personalized support.\n- Add database persistence (e.g., MongoDB) for chat and forum data.\n- Implement AI-driven chatbots for initial support.\n- Expand to mobile apps and multilingual support.",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
            new Paragraph({
                text: "8. Bibliography",
                heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "- Express.js Documentation: https://expressjs.com/\n- Socket.io Guide: https://socket.io/docs/\n- MDN Web Docs: https://developer.mozilla.org/",
                        font: "Times New Roman",
                        size: 24,
                    }),
                ],
            }),
        ],
    }],
});

Packer.toBuffer(doc).then((buffer) => {
    require('fs').writeFileSync('synopsis.docx', buffer);
    console.log('DOCX generated successfully!');
});
