import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Alert, Button, Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onReset?: () => void | undefined;
}

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      m: 2,
      backgroundColor: '#fff8f8'
    }}
  >
    <Alert severity="error" sx={{ mb: 2 }}>
      Something went wrong
    </Alert>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" color="error" gutterBottom>
        {error.message}
      </Typography>
      {process.env.NODE_ENV === 'development' && (
        <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
          {error.stack}
        </Typography>
      )}
    </Box>
    <Button
      variant="contained"
      color="primary"
      onClick={resetErrorBoundary}
    >
      Try Again
    </Button>
  </Paper>
);

export const ErrorBoundary = ({ children, fallbackComponent, onReset = undefined }: Props) => (
  <ReactErrorBoundary
    fallback={fallbackComponent || <ErrorFallback error={new Error()} resetErrorBoundary={() => {}} />}
    onReset={onReset}
    onError={(error, info) => console.error('Error caught by ErrorBoundary:', error, info)}
  >
    {children}
  </ReactErrorBoundary>
);