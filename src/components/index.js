import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Crear un tema de Material-UI personalizado para un diseño moderno
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Color azul
    },
    secondary: {
      main: '#f50057', // Color rosa
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Bordes redondeados
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Aplica el diseño base */}
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
