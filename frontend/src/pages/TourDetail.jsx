import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const [tour, setTour] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    numberOfPeople: 1,
  });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error('Error fetching tour:', error);
        navigate('/tours');
      }
    };

    fetchTour();
  }, [id, navigate]);

  const handleOpenDialog = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBookingSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        tourId: id,
        ...bookingData,
      });
      handleCloseDialog();
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (!tour) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4, mt: '80px', bgcolor: 'var(--background)', color: 'var(--text)' }}>
      <Grid container spacing={4}>
        {/* Tour Image */}
        <Grid item xs={12} md={8}>
          <img
            src={tour.image}
            alt={tour.title}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </Grid>

        {/* Booking Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            bgcolor: 'var(--surface)', 
            color: 'var(--text)', 
            borderRadius: '10px',
            border: '1px solid var(--border)'
          }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary)' }}>
                {tour.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--primary)' }} gutterBottom>
                ${tour.price}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }} gutterBottom>
                Duration: {tour.duration}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }} gutterBottom>
                Max Group Size: {tour.maxGroupSize}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }} gutterBottom>
                Difficulty: {tour.difficulty}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleOpenDialog}
                sx={{ 
                  mt: 2, 
                  bgcolor: 'var(--primary)', 
                  color: 'var(--background)', 
                  fontWeight: 'bold', 
                  '&:hover': { 
                    bgcolor: 'var(--secondary)',
                    color: 'var(--background)'
                  } 
                }}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Tour Details */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary)' }}>
            About This Tour
          </Typography>
          <Typography variant="body1" paragraph>
            {tour.description}
          </Typography>

          {/* Tour Highlights */}
          <Box sx={{ 
            bgcolor: 'var(--surface)', 
            color: 'var(--text)', 
            p: 3, 
            borderRadius: '10px', 
            mt: 4,
            border: '1px solid var(--border)'
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary)' }}>
              Tour Highlights
            </Typography>
            <Divider sx={{ bgcolor: 'var(--border)', mb: 2 }} />
            <List>
              {tour.highlights.map((highlight, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'var(--primary)' }} />
                  </ListItemIcon>
                  <ListItemText primary={highlight} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* What's Included */}
          <Box sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: '10px', 
            bgcolor: 'var(--surface)', 
            border: '1px solid var(--border)'
          }}>
            <Typography variant="h5" sx={{ color: 'var(--primary)' }} gutterBottom>
              What's Included
            </Typography>
            <Divider sx={{ bgcolor: 'var(--border)', mb: 2 }} />
            <List>
              {tour.included.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: 'var(--primary)' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* What's Not Included */}
          <Box sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: '10px', 
            bgcolor: 'var(--surface)', 
            border: '1px solid var(--border)'
          }}>
            <Typography variant="h5" sx={{ color: 'var(--primary)' }} gutterBottom>
              What's Not Included
            </Typography>
            <Divider sx={{ bgcolor: 'var(--border)', mb: 2 }} />
            <List>
              {tour.notIncluded.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CancelIcon sx={{ color: 'var(--secondary)' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            '& .MuiDialogTitle-root': {
              color: 'var(--primary)'
            }
          }
        }}
      >
        <DialogTitle>Book Tour</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              select
              fullWidth
              label="Start Date"
              value={bookingData.startDate}
              onChange={(e) =>
                setBookingData({ ...bookingData, startDate: e.target.value })
              }
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--border)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--text)',
                },
                '& .MuiInputBase-input': {
                  color: 'var(--text)',
                },
              }}
            >
              {tour.startDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {new Date(date).toLocaleDateString()}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Number of People"
              value={bookingData.numberOfPeople}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  numberOfPeople: parseInt(e.target.value),
                })
              }
              inputProps={{ min: 1, max: tour.maxGroupSize }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--border)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'var(--text)',
                },
                '& .MuiInputBase-input': {
                  color: 'var(--text)',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              color: 'var(--text)',
              '&:hover': {
                bgcolor: 'var(--surface)',
                color: 'var(--primary)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleBookingSubmit} 
            variant="contained" 
            sx={{ 
              bgcolor: 'var(--primary)', 
              color: 'var(--background)', 
              '&:hover': { 
                bgcolor: 'var(--secondary)',
                color: 'var(--background)'
              } 
            }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TourDetail;
