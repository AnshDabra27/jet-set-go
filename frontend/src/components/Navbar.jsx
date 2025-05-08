import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import PaletteIcon from '@mui/icons-material/Palette';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ParkIcon from '@mui/icons-material/Park';
import DiamondIcon from '@mui/icons-material/Diamond';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { currentTheme, toggleTheme, themes } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };
  const handleMobileMenuOpen = (event) => setMobileMenu(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMenu(null);

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleThemeChange = (theme) => {
    toggleTheme(theme);
    handleMenuClose();
  };

  const themeIcons = {
    crimson: <LocalFireDepartmentIcon />,
    azure: <WaterDropIcon />,
    emerald: <ParkIcon />,
    amethyst: <DiamondIcon />,
    amber: <WbSunnyIcon />,
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'var(--primary)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        width: '100%',
        left: 0,
        right: 0,
        paddingX: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          JetSetGo 1
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button component={RouterLink} to="/tours" sx={navButtonStyle}>
            Tours
          </Button>

          {user ? (
            <>
              <Button component={RouterLink} to="/my-bookings" sx={navButtonStyle}>
                My Bookings
              </Button>
              {user.role === 'admin' && (
                <Button component={RouterLink} to="/admin" sx={navButtonStyle}>
                  Admin Dashboard
                </Button>
              )}
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'var(--secondary)' },
                }}
              >
                <Badge badgeContent={2} color="error">
                  <Avatar
                    sx={{
                      bgcolor: 'var(--secondary)',
                      width: 32,
                      height: 32,
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                </Badge>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={menuStyle}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={user.name} />
                </MenuItem>

                <Divider />

                <MenuItem>
                  <ListItemIcon>
                    <PaletteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Theme" />
                </MenuItem>
                {Object.keys(themes).map((theme) => (
                  <MenuItem
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    selected={currentTheme === theme}
                  >
                    <ListItemIcon>{themeIcons[theme]}</ListItemIcon>
                    <ListItemText primary={theme.charAt(0).toUpperCase() + theme.slice(1)} />
                  </MenuItem>
                ))}

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" sx={navButtonStyle}>
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                sx={{
                  ...navButtonStyle,
                  background: 'white',
                  color: 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--surface)',
                    color: 'var(--primary)',
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              color: 'white',
              '&:hover': { backgroundColor: 'var(--secondary)' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenu}
        open={Boolean(mobileMenu)}
        onClose={handleMobileMenuClose}
        sx={menuStyle}
      >
        <MenuItem component={RouterLink} to="/tours" onClick={handleMobileMenuClose}>
          Tours
        </MenuItem>
        {user ? (
          [
            user.role === 'admin' && (
              <MenuItem
                key="admin"
                component={RouterLink}
                to="/admin"
                onClick={handleMobileMenuClose}
              >
                Admin Dashboard
              </MenuItem>
            ),
            <MenuItem
              key="bookings"
              component={RouterLink}
              to="/my-bookings"
              onClick={handleMobileMenuClose}
            >
              My Bookings
            </MenuItem>,
            <MenuItem key="profile" onClick={() => { handleProfileClick(); handleMobileMenuClose(); }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </MenuItem>,
            <Divider key="divider1" />,
            <MenuItem key="theme">
              <ListItemIcon>
                <PaletteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Theme" />
            </MenuItem>,
            ...Object.keys(themes).map((theme) => (
              <MenuItem
                key={theme}
                onClick={() => { handleThemeChange(theme); handleMobileMenuClose(); }}
                selected={currentTheme === theme}
              >
                <ListItemIcon>{themeIcons[theme]}</ListItemIcon>
                <ListItemText primary={theme.charAt(0).toUpperCase() + theme.slice(1)} />
              </MenuItem>
            )),
            <Divider key="divider2" />,
            <MenuItem key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>,
          ].filter(Boolean)
        ) : (
          [
            <MenuItem
              key="login"
              component={RouterLink}
              to="/login"
              onClick={handleMobileMenuClose}
            >
              Login
            </MenuItem>,
            <MenuItem
              key="register"
              component={RouterLink}
              to="/register"
              onClick={handleMobileMenuClose}
            >
              Register
            </MenuItem>,
          ]
        )}
      </Menu>
    </AppBar>
  );
};

const navButtonStyle = {
  color: 'white',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'width 0.3s ease-in-out',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&::after': {
      width: '100%',
    },
  },
};

const menuStyle = {
  '& .MuiPaper-root': {
    backgroundColor: 'var(--surface)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    '& .MuiMenuItem-root': {
      position: 'relative',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
      },
      '&.Mui-selected': {
        backgroundColor: 'rgba(var(--primary-rgb), 0.12)',
        '&:hover': {
          backgroundColor: 'rgba(var(--primary-rgb), 0.16)',
        },
      },
    },
    '& .MuiListItemIcon-root': {
      color: 'var(--primary)',
    },
    '& .MuiDivider-root': {
      borderColor: 'var(--border)',
    },
  },
};

export default Navbar;
