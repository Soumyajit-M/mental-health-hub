# 3.2 PRELIMINARY INVESTIGATION

## 3.2.1 Study of Current System

The preliminary investigation phase involved comprehensive analysis of how individuals currently seek mental health support and the existing processes they follow.

### Manual Mental Health Support Processes

Traditional mental health support follows these typical pathways:

**Primary Care Physician Route:** Individuals experiencing mental health issues typically schedule appointments with general practitioners, who then provide referrals to mental health specialists. This process involves:

- Initial appointment scheduling (average wait: 2-3 weeks)
- GP consultation and assessment (30-45 minutes)
- Referral to specialist (wait time: 4-8 weeks)
- Specialist appointment and treatment planning

This pathway presents significant time delays, with individuals waiting 6-11 weeks from initial concern to specialist care.

**Direct Specialist Access:** Some individuals attempt to directly contact mental health professionals:

- Finding qualified professionals through insurance networks or online directories
- Calling multiple offices to find availability
- Average wait time for first appointment: 3-6 weeks
- High costs ($100-300 per session) limiting accessibility

**Crisis Hotlines:** For immediate needs, individuals may call crisis hotlines:

- National Suicide Prevention Lifeline: 988
- Crisis Text Line: Text HOME to 741741
- Local crisis centers with varying availability

Limitations identified:

- High call volumes leading to wait times or busy signals
- Phone-only communication not preferred by younger demographics
- Limited follow-up or ongoing support mechanisms
- No integrated resource provision

**Online Resources:** Individuals search for information through:

- General search engines (information overload problem)
- Mental health websites (reliability varies)
- Social media groups (unmoderated, potential misinformation)
- Mental health apps (mostly paid subscriptions)

Problems identified:

- Difficulty distinguishing credible from non-credible sources
- Contradictory advice from different sources
- Lack of personalized guidance
- No real-time interaction capability

## 3.2.2 Interviews and Surveys

### Survey Methodology

A structured survey was conducted with 50 potential users across different demographics to understand current pain points and requirements.

**Survey Demographics:**

- Age range: 18-45 years
- 60% female, 38% male, 2% non-binary
- 70% students, 20% employed professionals, 10% unemployed
- 80% had experienced mental health challenges
- 90% had sought some form of mental health support

### Key Survey Findings

**Question 1: Have you ever sought mental health support?**

- Yes: 80% (40 respondents)
- No: 20% (10 respondents)

**Question 2: What prevented you from seeking support? (Multiple answers allowed)**

- Cost: 65% (26 respondents)
- Stigma/embarrassment: 55% (22 respondents)
- Don't know where to start: 45% (18 respondents)
- Long wait times: 40% (16 respondents)
- Geographic barriers: 30% (12 respondents)
- Scheduling conflicts: 25% (10 respondents)

**Question 3: Would you use an anonymous online mental health platform?**

- Definitely yes: 62% (31 respondents)
- Probably yes: 28% (14 respondents)
- Unsure: 8% (4 respondents)
- No: 2% (1 respondent)

**Question 4: What features are most important to you?**

- 24/7 availability: 88% (44 respondents)
- Anonymity: 76% (38 respondents)
- Free access: 90% (45 respondents)
- Peer support community: 54% (27 respondents)
- AI chatbot assistance: 48% (24 respondents)
- Resource library: 72% (36 respondents)

**Question 5: How comfortable are you with AI-powered mental health support?**

- Very comfortable: 24% (12 respondents)
- Somewhat comfortable: 46% (23 respondents)
- Neutral: 20% (10 respondents)
- Uncomfortable: 10% (5 respondents)

### Interview Insights

In-depth interviews with 10 individuals revealed additional insights:

**Finding 1: Crisis Response Gaps**
Three interviewees experienced mental health crises outside business hours and found limited immediate support options. They expressed need for instant, non-judgmental interaction during critical moments.

**Finding 2: Community Connection Value**
Seven interviewees mentioned feeling isolated in their struggles. They valued online communities but found existing platforms (Reddit, Facebook groups) lacked structure and sometimes contained harmful advice.

**Finding 3: Information Overwhelm**
Eight interviewees described feeling overwhelmed when searching for mental health information online. They wanted curated, trustworthy resources rather than extensive search results.

**Finding 4: Privacy Concerns**
All ten interviewees expressed concerns about privacy and stigma. They preferred anonymous platforms over those requiring personal identification or social media linking.

**Finding 5: AI Acceptance with Limits**
Interviewees showed openness to AI support for initial conversations and crisis situations but emphasized need for clear limitations and escalation to human professionals when necessary.

## 3.2.3 Market Research Findings

### Competitive Analysis

Analysis of existing platforms revealed market gaps and opportunities:

**Platform Category 1: Professional Teletherapy Services**

- BetterHelp, Talkspace, Amwell
- Pricing: $60-$100+ per week
- Strengths: Licensed professionals, structured therapy
- Weaknesses: Cost barriers, subscription requirements, limited crisis support

**Platform Category 2: Self-Help Applications**

- Headspace, Calm, Sanvello
- Pricing: $10-$15 per month
- Strengths: Meditation tools, mood tracking
- Weaknesses: No human or community interaction, limited crisis support

**Platform Category 3: Crisis-Specific Services**

- Crisis Text Line, National Suicide Prevention Lifeline
- Pricing: Free
- Strengths: Immediate crisis intervention
- Weaknesses: Limited to crisis moments, no ongoing support

**Platform Category 4: Community Forums**

- 7 Cups, Reddit mental health communities
- Pricing: Free (with paid premium options)
- Strengths: Peer support, anonymity
- Weaknesses: Unstructured, potential misinformation, no AI support

### Market Gap Identification

**Gap 1: Integrated Multi-Modal Support**
No free platform combines AI assistance, community forums, and curated resources in single interface.

**Gap 2: Real-Time Free Support**
Most free platforms lack real-time interaction capabilities or limit functionality in free tiers.

**Gap 3: Crisis-Capable AI Chatbots**
Existing AI chatbots either cost money or lack crisis detection and appropriate escalation mechanisms.

**Gap 4: Accessible Entry Points**
Many platforms require extensive registration, payment information, or social media linking, creating barriers during crisis situations.

## 3.2.4 Technical Research

### Technology Stack Investigation

Research into appropriate technologies for building the platform:

**Backend Framework Options:**

- Node.js + Express.js: Selected for JavaScript full-stack development, large ecosystem, excellent real-time support
- Python + Flask: Considered but rejected due to preference for JavaScript consistency
- Ruby on Rails: Not selected due to steeper learning curve

**Real-Time Communication:**

- Socket.IO: Selected for mature WebSocket abstraction, fallback mechanisms, extensive documentation
- Native WebSocket API: Considered but Socket.IO provides better browser compatibility
- Server-Sent Events: Insufficient for bidirectional communication needs

**AI Integration Options:**

- Hugging Face API: Selected for free tier, multiple model options, good documentation
- OpenAI GPT API: Considered but cost prohibitive for free platform
- Custom ML model: Beyond project scope and timeline

**Frontend Framework:**

- Vanilla JavaScript: Selected for learning experience, no build complexity, full control
- React: Considered but adds complexity and build requirements
- Vue.js: Similar considerations to React

**Hosting Platform:**

- Vercel: Selected for free tier, excellent Node.js support, easy deployment
- Heroku: Alternative option, also offers free tier
- AWS: Too complex and potentially costly for project scope

## 3.2.5 Requirement Gathering Methods

### Methods Employed

**1. Survey Distribution:**

- Online surveys via Google Forms
- Distributed through university networks and social media
- 50 completed responses collected over 2 weeks

**2. Personal Interviews:**

- 10 in-depth interviews (45-60 minutes each)
- Semi-structured format allowing exploration of unexpected themes
- Recorded with permission and transcribed for analysis

**3. Literature Review:**

- Academic papers on digital mental health interventions
- WHO guidelines on mental health service delivery
- Technical documentation for proposed technologies

**4. Competitive Analysis:**

- Hands-on testing of 12 existing platforms
- Feature comparison matrices
- Pricing and accessibility analysis

**5. Expert Consultation:**

- Informal discussions with computer science faculty about technical approaches
- Review of mental health organization websites for resource examples

### Initial Requirements Identified

Based on preliminary investigation, initial requirements were documented:

**Must-Have Requirements:**

1. Free access without payment barriers
2. Anonymous usage without mandatory registration
3. AI chatbot providing empathetic responses
4. Crisis keyword detection with appropriate escalation
5. Community forum for peer support
6. Curated mental health resource library
7. Real-time communication capabilities
8. Mobile-responsive design
9. Simple, intuitive user interface
10. Security measures protecting user privacy

**Should-Have Requirements:**

1. Dark/light theme options
2. Chat history during session
3. Search functionality for resources
4. User count display for community feel
5. Toast notifications for user feedback

**Nice-to-Have Requirements:**

1. Advanced AI models for better conversations
2. Moderation tools for forum content
3. Resource categorization and filtering
4. Export chat history functionality

## 3.2.6 Key Findings from Preliminary Investigation

### Critical Insights

**1. Accessibility is Primary Concern:**
Any barriers to access (cost, registration, complexity) significantly reduce likelihood of platform usage, especially during crisis situations.

**2. Multi-Modal Support is Valued:**
Users want options (AI, community, resources) rather than single-approach solutions. Different needs arise at different times.

**3. Privacy Enables Help-Seeking:**
Anonymous platforms reduce stigma-related barriers. Users more willing to seek help when identity protected.

**4. Immediate Response is Critical:**
Mental health challenges don't follow business hours. 24/7 availability crucial for crisis situations.

**5. Trust Requires Transparency:**
Users need clear understanding of AI limitations, when to seek professional help, and how their data is handled.

**6. Technical Feasibility Confirmed:**
Available technologies (Node.js, Socket.IO, Hugging Face) sufficient to build proposed platform within project constraints.

**7. Economic Viability:**
Free tiers of hosting platforms and APIs enable zero-cost operation for prototype/initial deployment.

### Decision to Proceed

Based on preliminary investigation findings, the decision was made to proceed with Mental Health Hub development. The combination of:

- Clear user need and demand (90% survey positive response)
- Identified market gaps
- Technical feasibility
- Economic viability
- Social impact potential
- Educational value

...provided strong justification for project initiation.

The preliminary investigation established foundation for detailed requirements specification and system design phases that followed.
