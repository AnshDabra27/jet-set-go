import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion"; // Import Framer Motion
import { Search, FilterList } from "@mui/icons-material"; // Icons
import { useTheme } from '../contexts/ThemeContext';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tours");
        setTours(response.data);
        setFilteredTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    let filtered = [...tours];

    if (searchTerm) {
      filtered = filtered.filter(
        (tour) =>
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter !== "all") {
      filtered = filtered.filter((tour) => {
        const price = tour.price;
        switch (priceFilter) {
          case "under100":
            return price < 100;
          case "100to500":
            return price >= 100 && price <= 500;
          case "over500":
            return price > 500;
          default:
            return true;
        }
      });
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter((tour) => tour.difficulty === difficultyFilter);
    }

    setFilteredTours(filtered);
  }, [searchTerm, priceFilter, difficultyFilter, tours]);

  return (
    <Container
      sx={{
        py: 4,
        mt: "80px",
        maxWidth: "95vw",
        bgcolor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: 'var(--primary)',
        }}
      >
        Discover Amazing Tours
      </Typography>

      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        {/* Sidebar Filters */}
        <Box
          sx={{
            width: "280px",
            p: 3,
            borderRadius: "8px",
            background: 'var(--surface)',
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: `1px solid var(--border)`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: 'var(--primary)',
            }}
          >
            <FilterList /> Filters
          </Typography>

          <TextField
            label="Search Tours"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ 
              mb: 2,
              '& .MuiInputBase-root': {
                bgcolor: 'var(--background)',
                color: 'var(--text)',
              },
              '& .MuiInputLabel-root': { color: 'var(--text)' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
            }}
            InputProps={{ endAdornment: <Search sx={{ color: 'var(--text)' }} /> }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: 'var(--text)' }}>Price Range</InputLabel>
            <Select 
              value={priceFilter} 
              onChange={(e) => setPriceFilter(e.target.value)}
              sx={{
                bgcolor: 'var(--background)',
                color: 'var(--text)',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            >
              <MenuItem value="all">All Prices</MenuItem>
              <MenuItem value="under100">Under $100</MenuItem>
              <MenuItem value="100to500">$100 - $500</MenuItem>
              <MenuItem value="over500">Over $500</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: 'var(--text)' }}>Difficulty</InputLabel>
            <Select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
              sx={{
                bgcolor: 'var(--background)',
                color: 'var(--text)',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
              }}
            >
              <MenuItem value="all">All Difficulties</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="difficult">Difficult</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tours Grid with Scroll Animation */}
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          {filteredTours.map((tour, index) => (
            <Grid item xs={12} sm={6} md={4} key={tour._id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }} // Cards start invisible and move up
                whileInView={{ opacity: 1, y: 0 }} // Animate when in viewport
                transition={{ duration: 0.6, delay: index * 0.1 }} // Delay for staggered effect
                viewport={{ once: true }} // Ensures animation plays only once
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    background: 'var(--surface)',
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": { transform: "scale(1.03)" },
                    border: `1px solid var(--border)`,
                  }}
                  onClick={() => navigate(`/tours/${tour._id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={tour.image}
                    alt={tour.title}
                    sx={{ borderRadius: "8px 8px 0 0" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ fontWeight: "bold", color: 'var(--primary)' }}>
                      {tour.title}
                    </Typography>
                    <Typography variant="body2" color="var(--text)">
                      {tour.description.substring(0, 100)}...
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="h6" color="var(--primary)">
                        ${tour.price}
                      </Typography>
                      <Typography variant="body2" color="var(--text)">
                        {tour.duration}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Tours;
