// groq-service.js
// Description: Service for interacting with the Groq SDK to send user queries and receive AI-generated responses.
// Dependencies: Groq SDK
import { Groq } from 'groq-sdk'

// Fetch Groq API key from environment variables
const groq_key = import.meta.env.VITE_GROQ_AI_KEY ;

// Initialize the Groq client with necessary configurations
const groq = new Groq({
  apiKey: groq_key, // API Key for authenticating requests
  dangerouslyAllowBrowser: true, // Allows usage of the SDK in browser environments
});

/**
 * requestAI
 * 
 * This function sends a user query to the Groq AI service and retrieves the AI's response.
 * 
 * @param {string} query - The user-provided query or prompt.
 * @returns {Promise<object>} - The response object from the Groq AI service.
 * 
 * Usage:
 * ```javascript
 * const response = await requestAI("Explain the significance of AI.");
 * console.log(response.choices[0].message.content);
 * ```
 * 
 * Example Response:
 * {
 *   choices: [
 *     {
 *       message: {
 *         role: "assistant",
 *         content: "AI stands for Artificial Intelligence..."
 *       }
 *     }
 *   ]
 * }
 * 
 * Notes:
 * - Uses the `llama3-8b-8192` model for generating responses.
 * - Ensure the `VITE_GROQ_AI_KEY` environment variable is correctly set in `.env`.
 */

export const requestAI = async (query) => {
    try {
      // Make a request to the Groq chat completion API
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: 'user', // Role of the sender (user or assistant)
            content: query, // Content of the user's query
          },
        ],
        model: 'llama3-8b-8192', // Model used for generating responses
      });
  
      return response; // Return the response from Groq
    } catch (error) {
      console.error('Error in Groq AI request:', error); // Log errors
      throw error; // Propagate errors for further handling
    }
  };