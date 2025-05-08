import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'var(--primary)',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              JetSetGo
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Your trusted partner in travel and exploration. We make your dream destinations a reality.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton 
                color="inherit" 
                component="a" 
                href="https://facebook.com" 
                target="_blank"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'var(--secondary)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit" 
                component="a" 
                href="https://twitter.com" 
                target="_blank"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'var(--secondary)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                component="a" 
                href="https://instagram.com" 
                target="_blank"
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'var(--secondary)',
                    transform: 'scale(1.1)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['About Us', 'Tours', 'Destinations', 'Contact'].map((item) => (
                <Box
                  component="li"
                  key={item}
                  sx={{
                    mb: 1,
                    '& a': {
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.8,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        color: 'var(--secondary)',
                      },
                    },
                  }}
                >
                  <Typography variant="body2" component="a" href="#">
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  123 Travel Street
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  City, Country 12345
                </Typography>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Phone: +1 234 567 890
                </Typography>
              </Box>
              <Box component="li">
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Email: info@jetsetgo.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Subscribe to our newsletter for travel updates and exclusive offers.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  flex: 1,
                  '&:focus': {
                    outline: 'none',
                    borderColor: 'var(--primary)',
                  },
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'var(--secondary)',
                  },
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} JetSetGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 