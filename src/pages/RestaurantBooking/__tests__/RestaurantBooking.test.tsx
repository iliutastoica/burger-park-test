import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RestaurantBooking } from '../index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const renderComponent = () => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RestaurantBooking />
    </LocalizationProvider>
  );
};

describe('RestaurantBooking', () => {
  it('renders the booking form with all required fields', () => {
    renderComponent();

    expect(screen.getByText('Reserve Your Table')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Special Requests (Optional)')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Reserve Table');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please select a date')).toBeInTheDocument();
    expect(await screen.findByText('Please select a time')).toBeInTheDocument();
  });

  it('validates guest number constraints', async () => {
    renderComponent();
    
    const guestsInput = screen.getByLabelText('Number of Guests');
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '10');

    const submitButton = screen.getByText('Reserve Table');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Maximum 8 guests per booking')).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    renderComponent();
    
    // Fill in required fields
    const guestsInput = screen.getByLabelText('Number of Guests');
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '4');

    // Mock date and time selection
    const dateInput = screen.getByLabelText('Date');
    const timeInput = screen.getByLabelText('Time');
    fireEvent.change(dateInput, { target: { value: '2024-02-01' } });
    fireEvent.change(timeInput, { target: { value: '19:00' } });

    const submitButton = screen.getByText('Reserve Table');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Reservation successful!')).toBeInTheDocument();
  });

  it('allows selecting an occasion', async () => {
    renderComponent();
    
    const occasionSelect = screen.getByLabelText('Occasion (Optional)');
    fireEvent.mouseDown(occasionSelect);
    
    const birthdayOption = screen.getByText('Birthday');
    fireEvent.click(birthdayOption);

    expect(occasionSelect).toHaveValue('Birthday');
  });
});