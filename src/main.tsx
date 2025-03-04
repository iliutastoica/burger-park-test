import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { router } from './routes';
import theme from './theme/theme';
import './index.css';
// import { ClerkErrorBoundary } from './components/ClerkErrorBoundary';

const PUBLISHABLE_KEY = 'pk_test_c3RlcmxpbmctbXVsbGV0LTEyLmNsZXJrLmFjY291bnRzLmRldiQ';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ClerkProvider>
  </StrictMode>,
)
