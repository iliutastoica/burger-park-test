import { createBrowserRouter } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { HomePage } from '../pages/HomePage';
import { TicketBooking } from '../pages/TicketBooking';
import { Experiences } from '../pages/Experiences';
import { RestaurantBooking } from '../pages/RestaurantBooking';
import { ClerkErrorBoundary } from '../components/ClerkErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'tickets',
        element: (
          <ClerkErrorBoundary>
            <ProtectedRoute>
              <TicketBooking />
            </ProtectedRoute>
          </ClerkErrorBoundary>
        )
      },
      {
        path: 'experiences',
        element: (
          <ClerkErrorBoundary>
            <ProtectedRoute>
              <Experiences />
            </ProtectedRoute>
          </ClerkErrorBoundary>
        )
      },
      {
        path: 'restaurant-booking',
        element: (
          <ClerkErrorBoundary>
            <ProtectedRoute>
              <RestaurantBooking />
            </ProtectedRoute>
          </ClerkErrorBoundary>
        )
      }
    ]
  }
]);