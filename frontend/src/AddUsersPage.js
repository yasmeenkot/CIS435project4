import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, CssBaseline, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';

const AddUsersPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log('User registered successfully:', data);
            setMessage('Registration successful!');
            setSeverity('success');
            setOpenSnackbar(true);
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } else {
            console.error('Registration failed:', response.statusText);
            setMessage('Registration failed. Username already exists');
            setSeverity('error');
            setOpenSnackbar(true);
        }
      } catch (error) {
            console.error('Registration failed:', error.message);
            setMessage('Registration failed.');
            setSeverity('error');
            setOpenSnackbar(true);
      }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateBack = () => {
    navigate('/login');
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', marginTop: '25px' }}>
      <CssBaseline />
      <div>
        <IconButton
            onClick={handleNavigateBack}
            edge="start"
            color="inherit"
            aria-label="back"
            style={{ position: 'absolute', top: '30px', left: '70px' }}
            >
            <ArrowBack />
            </IconButton>
        <Typography variant="h4">Sign Up</Typography>
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
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
          >
            Create Account
          </Button>
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

export default AddUsersPage;
