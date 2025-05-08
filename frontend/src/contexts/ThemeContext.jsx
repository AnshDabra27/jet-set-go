import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

export const themes = {
  crimson: {
    primary: '#D32F2F',
    secondary: '#B71C1C',
    background: '#ffffff',
    text: '#000000',
    surface: '#f5f5f5',
    border: 'rgba(0, 0, 0, 0.1)',
    accent: '#FF5252',
    muted: '#757575',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#ED6C02',
    info: '#0288D1',
  },
  azure: {
    primary: '#1976D2',
    secondary: '#1565C0',
    background: '#f8f9fa',
    text: '#1a1a1a',
    surface: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    accent: '#42A5F5',
    muted: '#757575',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#ED6C02',
    info: '#0288D1',
  },
  emerald: {
    primary: '#2E7D32',
    secondary: '#1B5E20',
    background: '#F1F8E9',
    text: '#1B5E20',
    surface: '#DCEDC8',
    border: 'rgba(46, 125, 50, 0.1)',
    accent: '#4CAF50',
    muted: '#689F38',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#ED6C02',
    info: '#0288D1',
  },
  amethyst: {
    background: '#faf5ff',
    surface: '#ffffff',
    primary: '#9b59b6',
    secondary: '#8e44ad',
    text: '#333333',
    border: '#e0e0e0'
  },
  amber: {
    background: '#fff7e6',
    surface: '#ffffff',
    primary: '#ffa000',
    secondary: '#ff8f00',
    text: '#333333',
    border: '#e0e0e0'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'crimson';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    
    // Apply all theme variables
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    
    // Add RGB values for primary color to support semi-transparent overlays
    const primaryRgb = hexToRgb(theme.primary);
    if (primaryRgb) {
      document.documentElement.style.setProperty('--primary-rgb', primaryRgb);
    }
    
    setCurrentTheme(themeName);
  };

  const toggleTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 