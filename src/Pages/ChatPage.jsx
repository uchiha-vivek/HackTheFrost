 

import '../App.css';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { requestAI } from '../utils/groq-service';
import { Loading } from '../component/loading';
import React, { useState } from 'react';
import axios from 'axios';

 
const corsEnabled = import.meta.env.VITE_KESTRA_CORS_ENABLED || true;

function Chat() {
   
  const [loading, setLoading] = useState(false);  
  const [messages, setMessages] = useState([]);  
  const [responseData, setResponseData] = useState({});  
  const [executionData, setExecutionData] = useState(null);  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value.trim();
    if (!message) return;  

      
    setMessages((prev) => [...prev, `You: ${message}`]); 
    setLoading(true);

    try {
       
      const response = await requestAI(message);
      const aiMessage = response?.choices[0]?.message?.content || 'AI response unavailable.';
      setMessages((prev) => [...prev, `AI: ${aiMessage}`]);

      // Send messages to Kestra webhook
      const kestraResponse = await axios.post(
        'http://localhost:8080/api/v1/executions/webhook/company.ai/AI_content/abcdefg',
        { messages },
        { withCredentials: corsEnabled }
      );
      setResponseData(kestraResponse.data);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, 'Error: Unable to process your request.']);
    } finally {
      setLoading(false);
      document.getElementById('message').value = ''
    }
  };

   
   
  const handlePrintJSON = async () => {
    if (!responseData.id) {
      console.log('No execution ID found');
      return;
    }

    try {
      console.log('Fetching execution data for ID:', responseData.id);
      const result = await axios.get(
        `http://localhost:8080/api/v1/executions/${responseData.id}`,
        { withCredentials: corsEnabled }
      );
      console.log('Execution data:', result.data);
      setExecutionData(result.data);
    } catch (error) {
      console.error('Error fetching execution data:', error);
    }
  };

  
  const renderMessageContent = (content) => {
    if (content.includes('```')) {
      const code = content.split('```').slice(1, -1).join('```');
      return (
        <SyntaxHighlighter language="javascript" style={darcula} wrapLongLines>
          {code}
        </SyntaxHighlighter>
      );
    }
    return (
      <p className="text-gray-200 text-left whitespace-pre-wrap">
        {content}
      </p>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white py-8">
      <h1 className="text-4xl font-bold text-indigo-500 mb-4">AI Chatbot</h1>
      <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          placeholder="Type your message..."
          className="flex-grow border border-gray-600 rounded-lg px-4 py-2 bg-gray-700 text-gray-300 focus:ring focus:ring-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg focus:ring focus:ring-indigo-400"
        >
          Send
        </button>
      </form>
       {/* Loading Spinner */}
      {loading && (
        <div className="mt-4">
          <Loading />
        </div>
      )}
       {/* Chat Messages */}
      <div className="flex flex-col mt-6 w-full max-w-2xl space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="border border-gray-700 bg-gray-700 p-4 rounded-lg"
          >
            {renderMessageContent(message)}
          </div>
        ))}
      </div>
       
      {responseData.id && (
  <div className="mt-6 bg-gray-700 p-4 rounded-lg text-center space-y-4">
    <p className="text-gray-400 text-sm">Execution ID:</p>
    <p className="text-indigo-400 font-mono text-lg">{responseData.id}</p>
    <a
      href={`http://localhost:8080/api/v1/executions/${responseData.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline"
    >
      View Execution Details
    </a>
  </div>
)}


    </main>
  );
}

export default Chat;