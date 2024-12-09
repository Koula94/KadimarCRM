'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/test');
        const data = await response.text();
        setMessage(data);
      } catch (err) {
        setError('Failed to connect to backend: ' + err.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
        <h1 className="text-xl font-bold mb-4">Backend Connection Test</h1>
        {message && (
          <p className="text-green-600">{message}</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
