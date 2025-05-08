import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';

const AdminDashboard = () => {
  const [tours, setTours] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    maxGroupSize: '',
    difficulty: '',
    image: '',
    location: '',
    highlights: '',
    included: '',
    notIncluded: '',
    startDates: '',
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tours');
      setTours(response.data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    }
  };

  const handleOpenDialog = (tour = null) => {
    if (tour) {
      setEditingTour(tour);
      setFormData({
        ...tour,
        highlights: tour.highlights.join('\n'),
        included: tour.included.join('\n'),
        notIncluded: tour.notIncluded.join('\n'),
        startDates: tour.startDates.map(date => new Date(date).toISOString().split('T')[0]).join('\n'),
      });
    } else {
      setEditingTour(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        maxGroupSize: '',
        difficulty: '',
        image: '',
        location: '',
        highlights: '',
        included: '',
        notIncluded: '',
        startDates: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTour(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const tourData = {
        ...formData,
        price: Number(formData.price),
        maxGroupSize: Number(formData.maxGroupSize),
        highlights: formData.highlights.split('\n').filter(h => h.trim()),
        included: formData.included.split('\n').filter(i => i.trim()),
        notIncluded: formData.notIncluded.split('\n').filter(n => n.trim()),
        startDates: formData.startDates.split('\n').filter(d => d.trim()),
      };

      if (editingTour) {
        await axios.put(`http://localhost:5000/api/tours/${editingTour._id}`, tourData);
      } else {
        await axios.post('http://localhost:5000/api/tours', tourData);
      }

      fetchTours();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving tour:', error);
    }
  };

  const handleDelete = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tours/${tourId}`);
        fetchTours();
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  return (
    <Container sx={{ py: 4, mt: 8, bgcolor: 'var(--background)', color: 'var(--text)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: 'var(--primary)' }}>
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{ 
            bgcolor: 'var(--primary)', 
            color: 'white',
            '&:hover': { bgcolor: 'var(--secondary)' } 
          }}
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Tour
        </Button>
      </Box>

      <Grid container spacing={4}>
        {tours.map((tour) => (
          <Grid item xs={12} md={4} key={tour._id}>
            <Card sx={{ 
              bgcolor: 'var(--surface)',
              color: 'var(--text)',
              border: `1px solid var(--border)`,
              '&:hover': { boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)' }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={tour.image}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary)' }}>
                  {tour.title}
                </Typography>
                <Typography variant="body2" color="var(--text)" gutterBottom>
                  {tour.description.substring(0, 100)}...
                </Typography>
                <Typography variant="h6" color="var(--primary)" gutterBottom>
                  ${tour.price}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton
                    sx={{ color: 'var(--primary)' }}
                    onClick={() => handleOpenDialog(tour)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: 'var(--error)' }}
                    onClick={() => handleDelete(tour._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {/* Dialog Title with Theme Background */}
        <DialogTitle sx={{ bgcolor: 'var(--primary)', color: 'white' }}>
          {editingTour ? 'Edit Tour' : 'Add New Tour'}
        </DialogTitle>

        <DialogContent sx={{ bgcolor: 'var(--background)' }}>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField 
              fullWidth 
              label="Title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Price" 
              name="price" 
              type="number" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Duration" 
              name="duration" 
              value={formData.duration} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Max Group Size" 
              name="maxGroupSize" 
              type="number" 
              value={formData.maxGroupSize} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              select 
              label="Difficulty" 
              name="difficulty" 
              value={formData.difficulty} 
              onChange={handleChange} 
              required
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="difficult">Difficult</MenuItem>
            </TextField>
            <TextField 
              fullWidth 
              label="Image URL" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Highlights (one per line)" 
              name="highlights" 
              value={formData.highlights} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Included (one per line)" 
              name="included" 
              value={formData.included} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Not Included (one per line)" 
              name="notIncluded" 
              value={formData.notIncluded} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
            <TextField 
              fullWidth 
              label="Start Dates (one per line, YYYY-MM-DD)" 
              name="startDates" 
              value={formData.startDates} 
              onChange={handleChange} 
              multiline 
              rows={3} 
              required 
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'var(--surface)',
                  color: 'var(--text)',
                },
                '& .MuiInputLabel-root': { color: 'var(--text)' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            />
          </Box>
        </DialogContent>

        {/* Dialog Actions with Theme Background */}
        <DialogActions sx={{ bgcolor: 'var(--primary)', color: 'white' }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'white' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              bgcolor: 'var(--surface)', 
              color: 'var(--primary)', 
              '&:hover': { bgcolor: 'var(--background)' } 
            }}
          >
            {editingTour ? 'Update Tour' : 'Add Tour'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 