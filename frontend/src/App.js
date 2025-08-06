import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://4fk3sb5suj.execute-api.eu-west-1.amazonaws.com/Deploy/hello')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Handle both direct and stringified body response
        if (data.message) {
          setMessage(data.message);
        } else if (data.body) {
          try {
            const parsed = JSON.parse(data.body);
            setMessage(parsed.message || 'No message found');
          } catch (err) {
            setMessage('Error parsing response body');
          }
        } else {
          setMessage('Unexpected response format');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Serverless Web App</h1>
      {message && <p>Lambda says: {message}</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default App;
