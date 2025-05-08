import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Link, Box, Alert, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '99vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--background)',
        overflowX: 'hidden',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'var(--surface)',
          border: '2px solid var(--primary)',
          color: 'var(--text)',
          textAlign: 'center',
          borderRadius: '15px',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.2)',
          fontFamily: '"Poppins", sans-serif',
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'var(--primary)', fontWeight: 600 }}>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif' }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'var(--background)',
                borderRadius: '10px',
                color: 'var(--text)',
              },
              '& .MuiInputLabel-root': { color: 'var(--primary)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputBase-root': {
                bgcolor: 'var(--background)',
                borderRadius: '10px',
                color: 'var(--text)',
              },
              '& .MuiInputLabel-root': { color: 'var(--primary)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              bgcolor: 'var(--primary)',
              color: 'white',
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
              '&:hover': { bgcolor: 'var(--secondary)' },
            }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: '"Poppins", sans-serif' }}>
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" sx={{ color: 'var(--primary)' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
