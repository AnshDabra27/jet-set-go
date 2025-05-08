import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import PaletteIcon from '@mui/icons-material/Palette';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ForestIcon from '@mui/icons-material/Forest';
import DiamondIcon from '@mui/icons-material/Diamond';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const ThemeSelector = () => {
  const { currentTheme, applyTheme } = useTheme();

  const handleThemeChange = (event, newTheme) => {
    if (newTheme !== null) {
      applyTheme(newTheme);
    }
  };

  const themeIcons = {
    crimson: <PaletteIcon sx={{ mr: 1, color: 'var(--primary)' }} />,
    azure: <WaterDropIcon sx={{ mr: 1, color: 'var(--primary)' }} />,
    emerald: <ForestIcon sx={{ mr: 1, color: 'var(--primary)' }} />,
    amethyst: <DiamondIcon sx={{ mr: 1, color: 'var(--primary)' }} />,
    amber: <WbSunnyIcon sx={{ mr: 1, color: 'var(--primary)' }} />
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <ToggleButtonGroup
        value={currentTheme}
        exclusive
        onChange={handleThemeChange}
        aria-label="theme selection"
        sx={{
          '& .MuiToggleButton-root': {
            color: 'var(--text)',
            borderColor: 'var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            '&.Mui-selected': {
              backgroundColor: 'var(--primary)',
              color: 'var(--background)',
              '& .MuiSvgIcon-root': {
                color: 'var(--background)',
              },
              '&:hover': {
                backgroundColor: 'var(--secondary)',
              },
            },
            '&:hover': {
              backgroundColor: 'var(--surface)',
              '& .MuiSvgIcon-root': {
                color: 'var(--secondary)',
              },
            },
          },
        }}
      >
        <ToggleButton value="crimson" aria-label="crimson theme">
          {themeIcons.crimson}
          Crimson
        </ToggleButton>
        <ToggleButton value="azure" aria-label="azure theme">
          {themeIcons.azure}
          Azure
        </ToggleButton>
        <ToggleButton value="emerald" aria-label="emerald theme">
          {themeIcons.emerald}
          Emerald
        </ToggleButton>
        <ToggleButton value="amethyst" aria-label="amethyst theme">
          {themeIcons.amethyst}
          Amethyst
        </ToggleButton>
        <ToggleButton value="amber" aria-label="amber theme">
          {themeIcons.amber}
          Amber
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ThemeSelector; 