import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TicketBooking } from '../index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const renderComponent = () => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TicketBooking />
    </LocalizationProvider>
  );
};

describe('TicketBooking', () => {
  it('renders the booking form with all required fields', () => {
    renderComponent();

    expect(screen.getByText('Book Your Tickets')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Adult Tickets')).toBeInTheDocument();
    expect(screen.getByLabelText('Child Tickets')).toBeInTheDocument();
    expect(screen.getByLabelText(/Apply Family Package/)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    renderComponent();
    
    const submitButton = screen.getByText('Book Now');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please select a date')).toBeInTheDocument();
  });

  it('calculates total price correctly', async () => {
    renderComponent();
    
    const adultTicketsInput = screen.getByLabelText('Adult Tickets');
    const childTicketsInput = screen.getByLabelText('Child Tickets');

    await userEvent.clear(adultTicketsInput);
    await userEvent.type(adultTicketsInput, '2');
    await userEvent.clear(childTicketsInput);
    await userEvent.type(childTicketsInput, '1');

    // Base price calculation (2 adults * $50 + 1 child * $30)
    expect(screen.getByText('Total Price: $130.00')).toBeInTheDocument();

    // Apply family discount
    const familyCheckbox = screen.getByLabelText(/Apply Family Package/);
    fireEvent.click(familyCheckbox);

    // Price with 20% family discount
    expect(screen.getByText('Total Price: $104.00')).toBeInTheDocument();
    expect(screen.getByText('Family discount applied!')).toBeInTheDocument();
  });

  it('shows success message on successful submission', async () => {
    renderComponent();
    
    // Fill in required fields
    const dateInput = screen.getByLabelText('Visit Date');
    fireEvent.change(dateInput, { target: { value: '2024-02-01' } });

    const submitButton = screen.getByText('Book Now');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Booking successful!')).toBeInTheDocument();
  });

  it('validates minimum adult tickets requirement', async () => {
    renderComponent();
    
    const adultTicketsInput = screen.getByLabelText('Adult Tickets');
    await userEvent.clear(adultTicketsInput);
    await userEvent.type(adultTicketsInput, '0');

    const submitButton = screen.getByText('Book Now');
    fireEvent.click(submitButton);

    expect(await screen.findByText('At least one adult ticket is required')).toBeInTheDocument();
  });
});