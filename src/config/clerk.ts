// Clerk configuration
export const clerkPubKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || '';

export const appearance = {
  elements: {
    formButtonPrimary: 'bg-primary hover:bg-primary-dark',
    card: 'rounded-xl shadow-md',
    headerTitle: 'text-2xl font-bold text-center',
    socialButtonsBlockButton: 'rounded-lg border border-gray-300 hover:border-gray-400',
    formFieldInput: 'rounded-lg border-gray-300 focus:ring-primary focus:border-primary',
  },
  layout: {
    socialButtonsPlacement: 'bottom',
    logoPlacement: 'inside',
    showOptionalFields: false,
  },
};

export const supportedSocialLogins = [
  'oauth_google',
  'oauth_facebook',
  'oauth_microsoft',
  'oauth_apple',
];