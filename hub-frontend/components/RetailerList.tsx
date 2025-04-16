import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import apiClient from '../lib/apiClient'; // Import the configured Axios instance

// Define an interface for the retailer data expected from the API
interface Retailer {
  id: number;
  name: string;
  is_active: boolean;
  // Add other relevant fields from your Retailer model
}

export default function RetailerList() {
  const { status } = useSession();
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRetailers = async () => {
      // Only fetch if authenticated
      if (status === 'authenticated') {
        setIsLoading(true);
        setError(null);
        try {
          const session = await getSession();
          if (session?.accessToken) {
            apiClient.defaults.headers.common['Authorization'] = `Token ${session.accessToken}`;
          }
          const response = await apiClient.get<Retailer[]>('/retailers/');
          setRetailers(response.data);
        } catch (err: unknown) {
          console.error("Error fetching retailers:", err);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to fetch retailers.');
          }
          // The interceptor in apiClient might handle 401/403 automatically
        } finally {
          setIsLoading(false);
        }
      } else {
        setRetailers([]); // Clear data if not authenticated
      }
    };

    fetchRetailers();
  }, [status]); // Re-run effect when authentication status changes

  if (status === 'loading') {
    return <p>Authenticating...</p>;
  }

  if (status !== 'authenticated') {
    return <p>Please sign in to view retailers.</p>;
  }

  if (isLoading) {
    return <p>Loading retailers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Retailers</h2>
      {retailers.length === 0 ? (
        <p>No retailers found.</p>
      ) : (
        <ul>
          {retailers.map((retailer) => (
            <li key={retailer.id}>
              {retailer.name} ({retailer.is_active ? 'Active' : 'Inactive'})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 