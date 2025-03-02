import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Alert, Button, Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const ClerkErrorFallback = ({ error }: { error: Error }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        m: 2,
        backgroundColor: '#fff8f8',
        maxWidth: 600,
        mx: 'auto',
        mt: 4
      }}
    >
      <Alert severity="error" sx={{ mb: 2 }}>
        Authentication Error
      </Alert>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Unable to initialize authentication
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          This could be due to a missing or invalid Clerk API key. Please ensure the application is properly configured.
        </Typography>
        {process.env.NODE_ENV === 'development' && (
          <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {error.message}
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Return to Home
      </Button>
    </Paper>
  );
};

export const ClerkErrorBoundary = ({ children }: Props) => (
  <ReactErrorBoundary
    fallback={<ClerkErrorFallback error={new Error()} />}
    onError={(error) => console.error('Clerk Authentication Error:', error)}
  >
    {children}
  </ReactErrorBoundary>
);