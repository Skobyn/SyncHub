import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://synchub-cloudrun-834454980092.us-central1.run.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor to handle 401/403 errors (e.g., redirect to login)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token might be invalid or expired, or user lacks permissions
      console.error('Authentication/Authorization error:', error.response.status);
      // Optionally redirect to login or show a message
      // import { signOut } from 'next-auth/react';
      // signOut({ callbackUrl: '/login' }); // Example: Force sign out
    }
    return Promise.reject(error);
  }
);

export default apiClient; 