// AI Service for Mental Health Support
// Using Hugging Face Inference API (free tier)

const axios = require('axios');

class AIService {
    constructor() {
        // Using a free, open-source mental health model
        this.apiUrl = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
        this.apiKey = process.env.HUGGINGFACE_API_KEY || ''; // Optional, works without key but slower
        
        // Mental health support templates
        this.templates = {
            greeting: [
                "Hello! I'm here to listen and support you. How are you feeling today?",
                "Hi there! I'm here to provide a safe space for you. What's on your mind?",
                "Welcome! I'm here to support you. Would you like to talk about how you're feeling?"
            ],
            crisis: [
                "I hear that you're going through a very difficult time. Please remember that you're not alone. If you're in immediate danger, please call the National Suicide Prevention Lifeline at 1-800-273-8255 or text HOME to 741741.",
                "Your safety is the most important thing. Please reach out to a crisis counselor immediately at 1-800-273-8255. They're available 24/7 and want to help."
            ],
            supportive: [
                "Thank you for sharing that with me. Your feelings are valid, and it takes courage to talk about them.",
                "I appreciate you opening up. Remember, it's okay to not be okay sometimes.",
                "What you're experiencing is real and important. Would you like to talk more about it?"
            ],
            encouragement: [
                "You're taking positive steps by reaching out. That shows strength.",
                "Remember to be kind to yourself. You're doing the best you can.",
                "Every small step forward is progress. You should be proud of yourself."
            ]
        };

        // Crisis keywords to detect urgent situations
        this.crisisKeywords = [
            'suicide', 'kill myself', 'end my life', 'want to die', 'hurt myself',
            'self harm', 'no reason to live', 'better off dead', 'end it all'
        ];

        // Greeting keywords
        this.greetingKeywords = [
            'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'
        ];
    }

    // Check if message contains crisis keywords
    detectCrisis(message) {
        const lowerMessage = message.toLowerCase();
        return this.crisisKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    // Check if message is a greeting
    isGreeting(message) {
        const lowerMessage = message.toLowerCase().trim();
        return this.greetingKeywords.some(keyword => lowerMessage.startsWith(keyword));
    }

    // Get random response from template
    getRandomResponse(templateKey) {
        const templates = this.templates[templateKey];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    // Rule-based response for common scenarios
    getRuleBasedResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Crisis detection
        if (this.detectCrisis(lowerMessage)) {
            return {
                response: this.getRandomResponse('crisis'),
                isCrisis: true
            };
        }

        // Greeting
        if (this.isGreeting(lowerMessage)) {
            return {
                response: this.getRandomResponse('greeting'),
                isCrisis: false
            };
        }

        // Keywords for different support types
        if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
            return {
                response: "Anxiety can be overwhelming. Remember to breathe deeply - try the 4-7-8 technique: breathe in for 4, hold for 7, out for 8. What specific worries are on your mind right now?",
                isCrisis: false
            };
        }

        if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('depression')) {
            return {
                response: "I hear that you're feeling down. Depression is a real condition, and your feelings are valid. Have you considered speaking with a mental health professional? In the meantime, what usually helps you feel a little better?",
                isCrisis: false
            };
        }

        if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
            return {
                response: "Feeling lonely is difficult. You're taking a brave step by reaching out here. Remember, loneliness is temporary, and there are people who care. What activities usually help you feel more connected?",
                isCrisis: false
            };
        }

        if (lowerMessage.includes('stress') || lowerMessage.includes('stressed')) {
            return {
                response: "Stress can be really challenging. Try breaking things down into smaller, manageable tasks. What's the main source of your stress right now?",
                isCrisis: false
            };
        }

        if (lowerMessage.includes('thank') || lowerMessage.includes('appreciate')) {
            return {
                response: "You're very welcome! I'm glad I could help. Remember, this community is here for you. How else can I support you today?",
                isCrisis: false
            };
        }

        return null; // No rule matched, will try AI
    }

    // Get AI-powered response
    async getAIResponse(message, conversationHistory = []) {
        try {
            // First try rule-based response
            const ruleResponse = this.getRuleBasedResponse(message);
            if (ruleResponse) {
                return ruleResponse;
            }

            // If no API key, use fallback supportive response
            if (!this.apiKey) {
                return {
                    response: `${this.getRandomResponse('supportive')} I'm here to listen. Could you tell me more about what you're experiencing?`,
                    isCrisis: false
                };
            }

            // Try AI model
            const response = await axios.post(
                this.apiUrl,
                {
                    inputs: message,
                    parameters: {
                        max_length: 150,
                        temperature: 0.7,
                        top_p: 0.9
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                }
            );

            let aiResponse = '';
            
            if (response.data && response.data.generated_text) {
                aiResponse = response.data.generated_text;
            } else if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
                aiResponse = response.data[0].generated_text;
            }

            // Sanitize and validate AI response
            if (aiResponse && aiResponse.length > 10) {
                return {
                    response: aiResponse.substring(0, 500), // Limit length
                    isCrisis: false
                };
            }

            // Fallback if AI fails
            return {
                response: this.getRandomResponse('supportive'),
                isCrisis: false
            };

        } catch (error) {
            console.error('AI Service Error:', error.message);
            
            // Fallback to supportive template
            return {
                response: this.getRandomResponse('supportive'),
                isCrisis: false
            };
        }
    }

    // Get mental health resources
    getResources() {
        return {
            response: "Here are some helpful resources:\n\n" +
                     "🆘 Crisis Support:\n" +
                     "• National Suicide Prevention Lifeline: 1-800-273-8255\n" +
                     "• Crisis Text Line: Text HOME to 741741\n" +
                     "• SAMHSA Helpline: 1-800-662-4357\n\n" +
                     "💙 Online Support:\n" +
                     "• BetterHelp.com - Online therapy\n" +
                     "• 7Cups.com - Free emotional support\n" +
                     "• NAMI.org - Mental health resources",
            isCrisis: false
        };
    }
}

module.exports = new AIService();
