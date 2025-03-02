import { useState } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './RestaurantBooking.module.scss';

interface BookingFormValues {
  date: Date | null;
  time: Date | null;
  guests: number;
  occasion: string;
  specialRequests: string;
}

const validationSchema = Yup.object({
  date: Yup.date().required('Please select a date').nullable(),
  time: Yup.date().required('Please select a time').nullable(),
  guests: Yup.number()
    .min(1, 'At least one guest is required')
    .max(8, 'Maximum 8 guests per booking')
    .required('Required'),
  occasion: Yup.string(),
  specialRequests: Yup.string().max(500, 'Maximum 500 characters')
});

const occasions = [
  'Birthday',
  'Anniversary',
  'Business Dinner',
  'Date Night',
  'Family Gathering',
  'Other'
];

export const RestaurantBooking = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormReset = () => {
    setShowSuccess(false);
  };

  const formik = useFormik<BookingFormValues>({
    initialValues: {
      date: null,
      time: null,
      guests: 2,
      occasion: '',
      specialRequests: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Booking submitted:', values);
      setShowSuccess(true);
    }
  });

  return (
    <ErrorBoundary>
      <Container maxWidth="md" className={styles.restaurantBooking} role="main" aria-labelledby="booking-title">
        <Paper elevation={3} className={styles.bookingForm}>
        <Typography variant="h4" gutterBottom className={styles.title} id="booking-title">
          Reserve Your Table
        </Typography>
        <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
          Experience fine dining at our Michelin-starred Burger Emporium
        </Typography>

        {showSuccess && (
          <Alert severity="success" className={styles.alert}>
            Reservation successful! Check your email for confirmation.
          </Alert>
        )}

        <ErrorBoundary onReset={handleFormReset}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formik.values.date}
                  onChange={(date) => {
                    formik.setFieldValue('date', date);
                    formik.setFieldTouched('date', true);
                    formik.validateField('date');
                  }}
                  className={styles.datePicker}
                  slotProps={{
                    textField: {
                      error: formik.touched.date && Boolean(formik.errors.date),
                      helperText: formik.touched.date && formik.errors.date
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={formik.values.time}
                  onChange={(time) => {
                    formik.setFieldValue('time', time);
                    formik.setFieldTouched('time', true);
                    formik.validateField('time');
                  }}
                  className={styles.timePicker}
                  slotProps={{
                    textField: {
                      error: formik.touched.time && Boolean(formik.errors.time),
                      helperText: formik.touched.time && formik.errors.time
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Guests"
                type="number"
                name="guests"
                value={formik.values.guests}
                onChange={formik.handleChange}
                error={formik.touched.guests && Boolean(formik.errors.guests)}
                helperText={formik.touched.guests && formik.errors.guests}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Occasion (Optional)</InputLabel>
                <Select
                  name="occasion"
                  value={formik.values.occasion}
                  onChange={formik.handleChange}
                  label="Occasion (Optional)"
                >
                  <MenuItem value="">None</MenuItem>
                  {occasions.map((occasion) => (
                    <MenuItem key={occasion} value={occasion}>
                      {occasion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Special Requests (Optional)"
                name="specialRequests"
                value={formik.values.specialRequests}
                onChange={formik.handleChange}
                error={
                  formik.touched.specialRequests &&
                  Boolean(formik.errors.specialRequests)
                }
                helperText={
                  formik.touched.specialRequests && formik.errors.specialRequests
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className={styles.submitButton}
                disabled={!formik.isValid || !formik.dirty || !formik.values.date ||!formik.values.time}
              >
                Reserve Table
              </Button>
            </Grid>
            </Grid>
          </form>
        </ErrorBoundary>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
};