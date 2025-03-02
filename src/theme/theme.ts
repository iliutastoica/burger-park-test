import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#710000',
      light: '#9c2626',
      dark: '#4d0000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fcb045',
      light: '#ffc373',
      dark: '#c58012',
      contrastText: '#000000',
    },
    custom: {
      main: '#de411b',
      light: '#ff6f46',
      dark: '#a50000',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 3px 5px 2px rgba(113, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;