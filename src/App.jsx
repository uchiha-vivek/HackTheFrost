// App.jsx
// Description: A React application to send content generation parameters to a Kestra webhook.
// Dependencies: Axios, React
import { useState } from 'react';
import axios from 'axios';

// CORS Configuration: Determines whether CORS is enabled based on environment variables.
const corsEnabled = import.meta.env.VITE_KESTRA_CORS_ENABLED || true;

/**
 * App Component
 * 
 * This component allows users to input content parameters (topic, tone, and style)
 * and submit them to a Kestra webhook. The response (execution ID) is displayed on success.
 * 
 * @returns {JSX.Element} The main application UI.
 */
function App() {
  // State to manage form input data
  const [formData, setFormData] = useState({
    topic: '', // Topic for the content generation
    tone: '',  // Tone of the content (e.g., formal, casual)
    style: '', // Style of the content (e.g., informative, creative)
  });

  // State to manage response data from the API
  const [responseData, setResponseData] = useState({});

  /**
   * handleSubmit
   * 
   * Handles form submission by sending the form data to the Kestra webhook.
   * 
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send POST request to the Kestra webhook
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/executions/webhook/company.team/webhook_example/abcdefg',
        formData,
        {
          withCredentials: corsEnabled, // Ensures credentials are included if needed
        }
      );
      setResponseData(response.data); // Update state with API response
    } catch (error) {
      console.error('Error:', error); // Log errors for debugging
    }
  };

  /**
   * handleChange
   * 
   * Updates the state with user input as they type into the form fields.
   * 
   * @param {Event} e - The input change event.
  */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-gray-100 py-8">
      {/* Header Section */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2 text-indigo-500">Kestra Webhook Example</h1>
        <p className="text-lg text-gray-400">Send content generation parameters to Kestra</p>
      </header>

      {/* Main Form Section */}
      <main className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-300">
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* Tone Input */}
          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-300">
              Tone
            </label>
            <input
              type="text"
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* Style Input */}
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-300">
              Style
            </label>
            <input
              type="text"
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border border-gray-600 text-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-medium py-2 rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none"
          >
            Submit
          </button>
        </form>
        {/* Display API Response */}
        {responseData.id && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg text-center">
            <p className="text-gray-400 text-sm">Execution ID:</p>
            <p className="text-indigo-400 font-mono text-lg">{responseData.id}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
