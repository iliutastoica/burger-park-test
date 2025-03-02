import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, useTheme, useMediaQuery } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import StarIcon from '@mui/icons-material/Star';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import styles from './Layout.module.scss';

export const Layout = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" id="app-bar" className="app-bar">
        <Toolbar id="header-bar" className="header-bar">
          <Typography
            variant="h6"
            component="button"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
            id="logo"
            className="logo"
            title='Burger Land'
            aria-label='Burger Land'
            role='banner'
            data-testid='logo'
          >
            Burger Land
          </Typography>
          {isSignedIn ? (
            <div className={styles.userMenu}>
              <Button
                color="inherit"
                onClick={() => navigate('/tickets')}
                startIcon={<ConfirmationNumberIcon />}
              >
                {!isMobile && 'Buy Tickets'}
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/experiences')}
                startIcon={<StarIcon />}
              >
                {!isMobile && 'Experiences'}
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/restaurant-booking')}
                startIcon={<RestaurantIcon />}
              >
                {!isMobile && 'Restaurant'}
              </Button>
              <Box sx={{ ml: 2 }}>
                <UserButton afterSignOutUrl="/" />
              </Box>
            </div>
          ) : (
            <div className={styles.userMenu}>
              <Button
                color="inherit"
                onClick={() => navigate('/sign-in')}
                startIcon={<LoginIcon />}
              >
                {!isMobile && 'Sign In'}
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/sign-up')}
                startIcon={<PersonAddIcon />}
              >
                {!isMobile && 'Sign Up'}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};