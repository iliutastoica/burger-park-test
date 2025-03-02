import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from '@mui/material';
import styles from './Experiences.module.scss';

interface Experience {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

const experiences: Experience[] = [
  {
    id: 'burger-making',
    title: 'Burger Making Masterclass',
    description: 'Learn the art of crafting gourmet burgers from our Michelin-starred chefs.',
    duration: '2 hours',
    price: 89.99,
    image: 'https://www.shutterstock.com/image-photo/freshly-made-burgers-cheese-lettuce-600w-2507834285.jpg'
  },
  {
    id: 'behind-scenes',
    title: 'Behind the Scenes Tour',
    description: 'Exclusive access to our kitchens, ride maintenance areas, and secret burger recipes.',
    duration: '1.5 hours',
    price: 49.99,
    image: 'https://www.shutterstock.com/image-photo/man-hat-serving-meal-restaurant-600w-2220683913.jpg'
  },
  {
    id: 'vip-tasting',
    title: 'VIP Tasting Experience',
    description: 'Sample our most exclusive burger creations in a private dining setting.',
    duration: '3 hours',
    price: 129.99,
    image: 'https://www.shutterstock.com/image-photo/business-lounge-staff-serving-coffee-600w-1037615239.jpg'
  },
];

const validationSchema = Yup.object({
  selectedExperiences: Yup.array().min(1, 'Please select at least one experience')
});

export const Experiences = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      selectedExperiences: []
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Booking submitted:', values);
      setShowSuccess(true);
    }
  });

  const handleExperienceSelect = (experienceId: string) => {
    const currentSelected = formik.values.selectedExperiences as string[];
    const newSelected = currentSelected.includes(experienceId)
      ? currentSelected.filter(id => id !== experienceId)
      : [...currentSelected, experienceId];
    
    formik.setFieldValue('selectedExperiences', newSelected);
  };

  const isExperienceSelected = (experienceId: string) => {
    return (formik.values.selectedExperiences as string[]).includes(experienceId);
  };

  const calculateTotal = () => {
    return (formik.values.selectedExperiences as string[])
      .reduce((total, id) => {
        const experience = experiences.find(exp => exp.id === id);
        return total + (experience?.price || 0);
      }, 0)
      .toFixed(2);
  };

  return (
    <Container maxWidth="lg" className={styles.experiences}>
      <Typography variant="h4" gutterBottom className={styles.title}>
        Unique Experiences
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
        Discover exclusive activities and behind-the-scenes access at Burger Land
      </Typography>

      {showSuccess && (
          <Alert severity="success" className={styles.alert}>
            Reservation successful! Check your email for confirmation.
          </Alert>
        )}

      <Grid container spacing={4} className={styles.experienceGrid}>
        {experiences.map((experience) => (
          <Grid item xs={12} md={4} key={experience.id}>
            <Card 
              className={`${styles.experienceCard} ${isExperienceSelected(experience.id) ? styles.selected : ''}`}
              onClick={() => handleExperienceSelect(experience.id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={experience.image}
                alt={experience.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {experience.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {experience.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {experience.duration}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${experience.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  variant={isExperienceSelected(experience.id) ? "contained" : "outlined"}
                >
                  {isExperienceSelected(experience.id) ? 'Selected' : 'Select'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {(formik.values.selectedExperiences as string[]).length > 0 && (
        <Paper elevation={3} className={styles.summary}>
          <Typography variant="h6" gutterBottom>
            Selected Experiences: {(formik.values.selectedExperiences as string[]).length}
          </Typography>
          <Typography variant="h5">
            Total: ${calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => formik.handleSubmit()}
            className={styles.bookButton}
          >
            Book Experiences
          </Button>
        </Paper>
      )}
    </Container>
  );
};