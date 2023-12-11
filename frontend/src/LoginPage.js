import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, Snackbar, Alert } from '@mui/material';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
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
        setMessage('Invalid credentials.');
        setSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setMessage('Login failed.');
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', marginTop: "25px"}}>
      <CssBaseline />
      <div>
        <Typography variant="h4">Login</Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/addUsersPage" style={{ textDecoration: 'none' }}>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              Sign up
            </Button>
            </Link>
        </form>
        <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                  onClose={handleSnackbarClose}
                  severity={severity}
                  sx={{ width: "100%", background: "black", color: "white", }}
                  >
                    {message}
                  </Alert>
            </Snackbar>
      </div>
    </Container>
    
  );
};

export default LoginPage;
