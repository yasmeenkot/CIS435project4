import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.user);
        navigate('/news');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="label-container">
        <label>
            Username
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        </div>
        <div className="label-container">
        <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
