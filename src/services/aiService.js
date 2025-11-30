/**
 * AI Service
 * Intelligent mental health support chatbot
 */

const axios = require('axios');
const config = require('../config/config');
const constants = require('../config/constants');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    this.config = config.ai;
    this.constants = constants;
    this.responseTemplates = this._initializeTemplates();
  }

  /**
   * Initialize response templates
   * @private
   */
  _initializeTemplates() {
    return {
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
  }

  /**
   * Check if message contains crisis keywords
   * @param {string} message - User message
   * @returns {boolean}
   */
  detectCrisis(message) {
    const lowerMessage = message.toLowerCase();
    return this.constants.CRISIS_KEYWORDS.some(keyword => 
      lowerMessage.includes(keyword)
    );
  }

  /**
   * Check if message is a greeting
   * @param {string} message - User message
   * @returns {boolean}
   */
  isGreeting(message) {
    const lowerMessage = message.toLowerCase().trim();
    return this.constants.GREETING_KEYWORDS.some(keyword =>
      lowerMessage.startsWith(keyword)
    );
  }

  /**
   * Get random response from template
   * @param {string} templateKey - Template category
   * @returns {string}
   */
  getRandomResponse(templateKey) {
    const templates = this.responseTemplates[templateKey];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Get rule-based response
   * @param {string} message - User message
   * @returns {Object|null}
   */
  getRuleBasedResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Crisis detection
    if (this.detectCrisis(lowerMessage)) {
      logger.warn('Crisis keyword detected in message');
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

    // Anxiety
    if (this.constants.TOPICS.ANXIETY.some(word => lowerMessage.includes(word))) {
      return {
        response: "Anxiety can be overwhelming. Remember to breathe deeply - try the 4-7-8 technique: breathe in for 4, hold for 7, out for 8. What specific worries are on your mind right now?",
        isCrisis: false
      };
    }

    // Depression
    if (this.constants.TOPICS.DEPRESSION.some(word => lowerMessage.includes(word))) {
      return {
        response: "I hear that you're feeling down. Depression is a real condition, and your feelings are valid. Have you considered speaking with a mental health professional? In the meantime, what usually helps you feel a little better?",
        isCrisis: false
      };
    }

    // Loneliness
    if (this.constants.TOPICS.LONELINESS.some(word => lowerMessage.includes(word))) {
      return {
        response: "Feeling lonely is difficult. You're taking a brave step by reaching out here. Remember, loneliness is temporary, and there are people who care. What activities usually help you feel more connected?",
        isCrisis: false
      };
    }

    // Stress
    if (this.constants.TOPICS.STRESS.some(word => lowerMessage.includes(word))) {
      return {
        response: "Stress can be really challenging. Try breaking things down into smaller, manageable tasks. What's the main source of your stress right now?",
        isCrisis: false
      };
    }

    // Gratitude
    if (this.constants.TOPICS.GRATITUDE.some(word => lowerMessage.includes(word))) {
      return {
        response: "You're very welcome! I'm glad I could help. Remember, this community is here for you. How else can I support you today?",
        isCrisis: false
      };
    }

    return null;
  }

  /**
   * Get AI-powered response
   * @param {string} message - User message
   * @returns {Promise<Object>}
   */
  async getAIResponse(message) {
    try {
      // First try rule-based response
      const ruleResponse = this.getRuleBasedResponse(message);
      if (ruleResponse) {
        return ruleResponse;
      }

      // If no API key, use fallback
      if (!this.config.apiKey) {
        return {
          response: `${this.getRandomResponse('supportive')} I'm here to listen. Could you tell me more about what you're experiencing?`,
          isCrisis: false
        };
      }

      // Try AI model
      const response = await axios.post(
        this.config.apiUrl,
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
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: this.config.timeout
        }
      );

      let aiResponse = '';
      
      if (response.data && response.data.generated_text) {
        aiResponse = response.data.generated_text;
      } else if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
        aiResponse = response.data[0].generated_text;
      }

      if (aiResponse && aiResponse.length > 10) {
        return {
          response: aiResponse.substring(0, 500),
          isCrisis: false
        };
      }

      return {
        response: this.getRandomResponse('supportive'),
        isCrisis: false
      };

    } catch (error) {
      logger.error('AI Service Error:', error.message);
      return {
        response: this.getRandomResponse('supportive'),
        isCrisis: false
      };
    }
  }

  /**
   * Get mental health resources
   * @returns {Object}
   */
  getResources() {
    const resources = this.constants.EMERGENCY_RESOURCES;
    return {
      response: "Here are some helpful resources:\n\n" +
               "🆘 Crisis Support:\n" +
               `• ${resources.SUICIDE_PREVENTION.name}: ${resources.SUICIDE_PREVENTION.phone}\n` +
               `• ${resources.CRISIS_TEXT.name}: ${resources.CRISIS_TEXT.text}\n` +
               `• ${resources.SAMHSA.name}: ${resources.SAMHSA.phone}\n\n` +
               "💙 Online Support:\n" +
               "• BetterHelp.com - Online therapy\n" +
               "• 7Cups.com - Free emotional support\n" +
               "• NAMI.org - Mental health resources",
      isCrisis: false
    };
  }
}

module.exports = new AIService();
