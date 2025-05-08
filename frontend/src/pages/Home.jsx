import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import axios from 'axios';
import 'animate.css';
import AnalogWatch from '../components/AnalogWatch';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tours');
        setFeaturedTours(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <Box
      className="animate__animated animate__backInUp"
      sx={{
        bgcolor: 'var(--background)',
        color: 'var(--text)',
        minHeight: '100vh',
        overflow: 'auto',
        fontFamily: '"Poppins", sans-serif',
        position: 'relative',
      }}
    >
      {/* Watch Position */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '70px', sm: '80px', md: '90px', lg: '100px' },
          right: { xs: '10px', sm: '15px', md: '20px', lg: '30px' },
          zIndex: 1000,
          '@media (max-width: 1024px)': { // iPad Pro
            top: '85px',
            right: '20px',
          },
          '@media (max-width: 768px)': { // iPad Mini
            top: '75px',
            right: '15px',
          },
          '@media (max-width: 600px)': {
            position: 'fixed',
            top: '65px',
            right: '10px',
          },
          '@media (max-width: 400px)': {
            top: '60px',
            right: '5px',
          },
        }}
      >
        <AnalogWatch />
      </Box>

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Box
          sx={{
            bgcolor: 'transparent',
            color: 'var(--text)',
            py: { xs: 3, sm: 4, md: 6, lg: 8 },
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            textAlign: 'center',
            backgroundImage: 'url(/path-to-hero-image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            mt: { xs: '60px', sm: '70px', md: '80px', lg: '90px' },
            '@media (max-width: 1024px)': { // iPad Pro
              mt: '75px',
              py: 5,
              px: 4,
            },
            '@media (max-width: 768px)': { // iPad Mini
              mt: '65px',
              py: 4,
              px: 3,
            },
            '@media (max-width: 600px)': {
              mt: '55px',
              py: 3,
              px: 2,
            },
            '@media (max-width: 400px)': {
              mt: '50px',
              py: 2,
              px: 1,
            },
          }}
        >
          <Container>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  fontSize: { 
                    xs: '1.8rem', 
                    sm: '2.2rem', 
                    md: '2.5rem', 
                    lg: '3rem',
                    '@media (max-width: 1024px)': '2.3rem',
                    '@media (max-width: 768px)': '2rem',
                  }
                }}
              >
                Discover Amazing Places
              </Typography>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontFamily: '"Inter", sans-serif', 
                  fontWeight: 400,
                  fontSize: {
                    xs: '1rem',
                    sm: '1.2rem',
                    md: '1.4rem',
                    lg: '1.5rem',
                    '@media (max-width: 1024px)': '1.3rem',
                    '@media (max-width: 768px)': '1.1rem',
                  }
                }}
              >
                Explore the world with JetSetGo
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  bgcolor: 'var(--primary)',
                  color: 'white',
                  fontWeight: 500,
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': { bgcolor: 'var(--secondary)' },
                }}
                size="large"
                onClick={() => navigate('/tours')}
              >
                View All Tours
              </Button>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Featured Tours */}
      <Container sx={{ mt: 2 , mb:4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'var(--primary)', fontWeight: 600 }}>
          Featured Tours
        </Typography>
        <Grid container spacing={4}>
          {featuredTours.map((tour) => (
            <Grid item xs={12} md={4} key={tour._id}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: '15px',
                    backdropFilter: 'blur(12px)',
                    background: 'var(--surface)',
                    border: `1px solid var(--primary)`,
                    color: 'var(--text)',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    '&:hover': { boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)' },
                    fontFamily: '"Inter", sans-serif',
                  }}
                  onClick={() => navigate(`/tours/${tour._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={tour.image}
                    alt={tour.title}
                    sx={{
                      borderRadius: '15px 15px 0 0',
                      opacity: 0.9,
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ color: 'var(--primary)', fontWeight: 600 }}>
                      {tour.title}
                    </Typography>
                    <Typography variant="body2" color="var(--text)" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 400 }}>
                      {tour.description.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, color: 'var(--primary)', fontWeight: 500 }}>
                      ${tour.price}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
