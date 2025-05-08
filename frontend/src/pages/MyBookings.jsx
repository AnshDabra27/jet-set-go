import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const cancelBooking = async (bookingId) => {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        fetchBookings();
      } catch (error) {
        console.error('Error cancelling booking:', error);
        setErrorMessage('Failed to cancel booking. Please try again later.');
      }
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container
      sx={{
        py: 4,
        mt: '80px',
        bgcolor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'var(--primary)' }}
      >
        My Bookings
      </Typography>

      {/* Error message display */}
      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Grid container spacing={4}>
        {bookings.map((booking, index) => (
          <Grid item xs={12} md={6} key={booking._id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={booking.tour?.image || '/default-tour.jpg'}
                  alt={booking.tour?.title || 'Tour'}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: 'var(--primary)' }}
                  >
                    {booking.tour?.title || 'Tour Title Not Available'}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={booking.status.toUpperCase()}
                      color={getStatusColor(booking.status)}
                      size="small"
                      sx={{
                        bgcolor: `var(--${getStatusColor(booking.status)})`,
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: 'var(--text)', opacity: 0.8 }}
                    gutterBottom
                  >
                    Start Date: {new Date(booking.startDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'var(--text)', opacity: 0.8 }}
                    gutterBottom
                  >
                    Number of People: {booking.numberOfPeople}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: 'var(--primary)' }}
                    gutterBottom
                  >
                    Total Price: ${booking.totalPrice}
                  </Typography>

                  {booking.status !== 'cancelled' ? (
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDialog(booking)}
                      sx={{
                        mt: 2,
                        borderColor: 'var(--error)',
                        color: 'var(--error)',
                        '&:hover': {
                          borderColor: 'var(--error)',
                          bgcolor: 'var(--error-light)',
                        },
                      }}
                    >
                      Cancel Booking
                    </Button>
                  ) : (
                    <Typography variant="body2" color="error">
                      Booking Cancelled
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'var(--primary)' }}>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your booking for{' '}
            {selectedBooking?.tour?.title || 'this tour'}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: 'var(--text)',
              '&:hover': {
                bgcolor: 'var(--hover)',
              },
            }}
          >
            No, Keep It
          </Button>
          <Button
            onClick={async () => {
              await cancelBooking(selectedBooking._id);
              handleCloseDialog(); // Close the dialog after cancellation
            }}
            variant="contained"
            sx={{
              bgcolor: 'var(--error)',
              color: 'white',
              '&:hover': {
                bgcolor: 'var(--error-dark)',
              },
            }}
          >
            Yes, Cancel It
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBookings;
