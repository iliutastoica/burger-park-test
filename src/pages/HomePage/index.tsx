import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import styles from './HomePage.module.scss';
import AnimatedPark from '../../components/Home/AnimatedPark';
import HomeIntro from '../../components/Home/HomeIntro';

export const HomePage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <Box className={styles.homePage} id="homePage">
      <Container maxWidth="lg" className={styles.homeContainer}>
        <Box className={styles.hero}>
          <HomeIntro />
          {!isSignedIn && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/sign-up')}
              className={styles.ctaButton}
            >
              Start Your Journey
            </Button>
          )}
        </Box>

        <Grid container spacing={4} className={styles.features} id="features">
          <Grid item xs={12} md={4} className={styles.gridCard}>
            <Paper elevation={3} className={styles.featureCard}>
              <Typography variant="h6" gutterBottom>
                Thrilling Rides
              </Typography>
              <Typography>
                Experience our world-famous burger-themed attractions and rides.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={styles.gridCard}>
            <Paper elevation={3} className={styles.featureCard}>
              <Typography variant="h6" gutterBottom>
                Michelin Star Restaurant
              </Typography>
              <Typography>
                Dine at our exclusive Burger Emporium with star chefs.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={styles.gridCard}>
            <Paper elevation={3} className={styles.featureCard}>
              <Typography variant="h6" gutterBottom>
                Family Packages
              </Typography>
              <Typography>
                Special discounts and experiences for the whole family.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

      </Container>
      <AnimatedPark />
    </Box>
  );
};