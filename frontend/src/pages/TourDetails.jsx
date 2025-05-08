import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Rating,
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Group,
  Hiking,
  AttachMoney,
  ArrowBack,
} from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
        setTour(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour:', error);
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          bgcolor: 'var(--background)',
        }}
      >
        <CircularProgress sx={{ color: 'var(--primary)' }} />
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
          pt: 8,
          bgcolor: 'var(--background)',
          color: 'var(--text)',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tour not found
        </Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/tours')}
          sx={{
            bgcolor: 'var(--primary)',
            color: 'white',
            '&:hover': {
              bgcolor: 'var(--secondary)',
            },
          }}
        >
          Back to Tours
        </Button>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        py: 4,
        mt: '80px',
        bgcolor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/tours')}
          sx={{
            mb: 3,
            bgcolor: 'var(--primary)',
            color: 'white',
            '&:hover': {
              bgcolor: 'var(--secondary)',
            },
          }}
        >
          Back to Tours
        </Button>

        <Grid container spacing={4}>
          {/* Tour Image */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid var(--border)',
                bgcolor: 'var(--surface)',
              }}
            >
              <img
                src={tour.image}
                alt={tour.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            </Paper>
          </Grid>

          {/* Tour Details */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                border: '1px solid var(--border)',
                bgcolor: 'var(--surface)',
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: 'var(--primary)' }}>
                {tour.title}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {tour.description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color: 'var(--primary)' }} />
                      <Typography>{tour.location}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ color: 'var(--primary)' }} />
                      <Typography>{tour.duration}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Group sx={{ color: 'var(--primary)' }} />
                      <Typography>{tour.groupSize} people max</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Hiking sx={{ color: 'var(--primary)' }} />
                      <Typography
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {tour.difficulty}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2, borderColor: 'var(--border)' }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: 'var(--primary)' }}>
                  Price
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoney sx={{ color: 'var(--primary)' }} />
                  <Typography variant="h5">${tour.price}</Typography>
                  <Typography variant="body2">per person</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, color: 'var(--primary)' }}>
                  Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={tour.rating} readOnly precision={0.5} />
                  <Typography>({tour.reviews} reviews)</Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: 'var(--primary)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'var(--secondary)',
                  },
                }}
              >
                Book Now
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default TourDetails; 