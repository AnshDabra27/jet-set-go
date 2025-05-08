import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const Layout = () => {
  const location = useLocation();
  const hideFooter = ['/login', '/register'].includes(location.pathname);
  const { currentTheme } = useTheme();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'var(--background)',
        color: 'var(--text)'
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      {!hideFooter && <Footer />}
    </Box>
  );
};

export default Layout; 