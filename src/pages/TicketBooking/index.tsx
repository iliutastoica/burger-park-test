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
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './TicketBooking.module.scss';

interface TicketFormValues {
  visitDate: Date | null;
  adultTickets: number;
  childTickets: number;
  isFamily: boolean;
}

const validationSchema = Yup.object({
  visitDate: Yup.date().required('Please select a date').nullable(),
  adultTickets: Yup.number()
    .min(1, 'At least one adult ticket is required')
    .required('Required'),
  childTickets: Yup.number().min(0, 'Cannot be negative').required('Required'),
  isFamily: Yup.boolean(),
});

export const TicketBooking = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormReset = () => {
    setShowSuccess(false);
  };

  const formik = useFormik<TicketFormValues>({
    initialValues: {
      visitDate: null,
      adultTickets: 1,
      childTickets: 0,
      isFamily: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // Here you would typically make an API call to process the booking
      console.log('Booking submitted:', values);
      setShowSuccess(true);
    },
  });

  const calculateTotal = () => {
    const basePrice = {
      adult: 50,
      child: 30,
    };

    let total =
      formik.values.adultTickets * basePrice.adult +
      formik.values.childTickets * basePrice.child;

    if (formik.values.isFamily && formik.values.adultTickets >= 2) {
      // 20% family discount
      total = total * 0.8;
    }

    return total.toFixed(2);
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="md" className={styles.ticketBooking} role="main" aria-labelledby="ticket-booking-title">
      <Paper elevation={3} className={styles.bookingForm}>
        <Typography variant="h4" gutterBottom className={styles.title} id="ticket-booking-title">
          Book Your Tickets
        </Typography>

        {showSuccess && (
          <Alert severity="success" className={styles.alert}>
            Booking successful! Check your email for confirmation.
          </Alert>
        )}

        <ErrorBoundary onReset={handleFormReset}>
          <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Visit Date"
                  value={formik.values.visitDate}
                  onChange={(date) => {
                    formik.setFieldValue('visitDate', date);
                    formik.setFieldTouched('visitDate', true);
                    formik.validateField('visitDate');
                  }}
                  className={styles.datePicker}
                  slotProps={{
                    textField: {
                      error: formik.touched.visitDate && Boolean(formik.errors.visitDate),
                      helperText: formik.touched.visitDate && formik.errors.visitDate
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Adult Tickets"
                type="number"
                name="adultTickets"
                value={formik.values.adultTickets}
                onChange={formik.handleChange}
                error={formik.touched.adultTickets && Boolean(formik.errors.adultTickets)}
                helperText={formik.touched.adultTickets && formik.errors.adultTickets}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Child Tickets"
                type="number"
                name="childTickets"
                value={formik.values.childTickets}
                onChange={formik.handleChange}
                error={formik.touched.childTickets && Boolean(formik.errors.childTickets)}
                helperText={formik.touched.childTickets && formik.errors.childTickets}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.isFamily}
                    onChange={formik.handleChange}
                    name="isFamily"
                  />
                }
                label="Apply Family Package (20% discount for 2 or more adult tickets)"
              />
            </Grid>

            <Grid item xs={12}>
              <Paper className={styles.totalPrice}>
                <Typography variant="h6">
                  Total Price: ${calculateTotal()}
                </Typography>
                {formik.values.isFamily && formik.values.adultTickets >= 2 && (
                  <Typography variant="body2" color="success.main">
                    Family discount applied!
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className={styles.submitButton}
                aria-label="Book tickets now"
                disabled={!formik.isValid || !formik.dirty || !formik.values.visitDate}
              >
                Book Now
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