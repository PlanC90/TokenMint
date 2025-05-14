import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface Token {
  id: string;
  name: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const [tokenRequests, setTokenRequests] = useState<Token[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data, error } = await supabase
          .from('tokens')
          .select('*');

        if (error) {
          console.error('Error fetching tokens:', error);
          setError(error.message);
        } else {
          setTokenRequests(data || []);
        }
      } catch (e: any) {
        console.error('Error fetching tokens:', e.message);
        setError(e.message);
      }
    };

    fetchTokens();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokenRequests.map((request) => (
          <div key={request.id} className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold">{request.name}</h2>
            <p>Status: {request.status}</p>
            {/* Add more details and actions here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
