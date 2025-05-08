import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const AnalogWatch = () => {
  const [time, setTime] = useState(new Date());
  const { currentTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDegrees = ((seconds / 60) * 360);
  const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
  const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30);

  const numbers = [
    { value: '12', deg: 0 },
    { value: '1', deg: 30 },
    { value: '2', deg: 60 },
    { value: '3', deg: 90 },
    { value: '4', deg: 120 },
    { value: '5', deg: 150 },
    { value: '6', deg: 180 },
    { value: '7', deg: 210 },
    { value: '8', deg: 240 },
    { value: '9', deg: 270 },
    { value: '10', deg: 300 },
    { value: '11', deg: 330 },
  ];

  return (
    <Box
      sx={{
        width: { xs: '60px', sm: '80px', md: '100px', lg: '120px' },
        height: { xs: '60px', sm: '80px', md: '100px', lg: '120px' },
        borderRadius: '50%',
        position: 'relative',
        background: 'var(--surface)',
        border: `2px solid var(--primary)`,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          background: 'var(--background)',
        }}
      >
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: { xs: '1px', sm: '1.5px', md: '2px', lg: '2.5px' },
              height: { xs: '3px', sm: '4px', md: '6px', lg: '8px' },
              background: 'var(--primary)',
              transform: `rotate(${i * 30}deg) translate(-50%, -45%)`,
              transformOrigin: 'center',
            }}
          />
        ))}

        {/* Clock Numbers */}
        {numbers.map(({ value, deg }) => {
          const radius = 40;
          const rad = (deg - 90) * (Math.PI / 180);
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);

          return (
            <Typography
              key={value}
              sx={{
                position: 'absolute',
                top: `${y}%`,
                left: `${x}%`,
                transform: 'translate(-50%, -50%)',
                color: 'var(--primary)',
                fontSize: { xs: '8px', sm: '10px', md: '12px', lg: '14px' },
                fontWeight: 'bold',
              }}
            >
              {value}
            </Typography>
          );
        })}

        {/* Hour hand */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: '1.5px', sm: '2px', md: '3px', lg: '4px' },
            height: '25%',
            background: 'var(--primary)',
            transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
            transformOrigin: 'bottom center',
            borderRadius: '2px',
            zIndex: 3,
          }}
        />

        {/* Minute hand */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: '1px', sm: '1.5px', md: '2px', lg: '3px' },
            height: '35%',
            background: 'var(--primary)',
            transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
            transformOrigin: 'bottom center',
            borderRadius: '2px',
            zIndex: 2,
          }}
        />

        {/* Second hand */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: '0.5px', sm: '1px', md: '1.5px', lg: '2px' },
            height: '40%',
            background: 'var(--secondary)',
            transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
            transformOrigin: 'bottom center',
            borderRadius: '1px',
            zIndex: 1,
          }}
        />

        {/* Center dot */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: { xs: '3px', sm: '4px', md: '6px', lg: '8px' },
            height: { xs: '3px', sm: '4px', md: '6px', lg: '8px' },
            background: 'var(--primary)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
          }}
        />
      </Box>
    </Box>
  );
};

export default AnalogWatch;
