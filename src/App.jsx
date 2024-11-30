
import { useState } from 'react';
import axios from 'axios';
import './App.css';

// CORS Configuration
const corsEnabled = import.meta.env.VITE_KESTRA_CORS_ENABLED || true;

function App() {
  const [formData, setFormData] = useState({
    topic: '',
    tone: '',
    style: '',
  });
  const [responseData, setResponseData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/executions/webhook/company.team/webhook_example/abcdefg',
        formData,
        {
          // CORS Configuration
          withCredentials: corsEnabled,
          // headers: {
          //   'Access-Control-Allow-Origin': '*', // or specify your exact origin
          //   'Content-Type': 'application/json',
          // },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kestra Webhook Example</h1>
        <p>Send content generation parameters to Kestra</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tone">Tone:</label>
            <input
              type="text"
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="style">Style:</label>
            <input
              type="text"
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {responseData.id && (
          <p>
            <b>Execution ID:</b> {responseData.id}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;