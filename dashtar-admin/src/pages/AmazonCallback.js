import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import AmazonServices from '../services/AmazonServices';
import { notifySuccess, notifyError } from '../utils/toast';

function AmazonCallback() {
  const [status, setStatus] = useState('processing');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code and state from URL parameters
        const params = new URLSearchParams(location.search);
        const code = params.get('spapi_oauth_code');
        const state = params.get('state');

        if (!code || !state) {
          setStatus('error');
          notifyError('Invalid callback parameters');
          return;
        }

        // Exchange the code for access token
        const response = await AmazonServices.handleCallback(code, state);
        
        if (response.data.success) {
          setStatus('success');
          notifySuccess('Successfully connected to Amazon Seller Central');
          // Redirect back to integrations page after a short delay
          setTimeout(() => navigate('/integrations'), 2000);
        } else {
          setStatus('error');
          notifyError('Failed to connect to Amazon');
        }
      } catch (error) {
        console.error('Error handling callback:', error);
        setStatus('error');
        notifyError(error.response?.data?.message || 'Failed to connect to Amazon');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        {status === 'processing' && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Connecting to Amazon Seller Central...
            </h2>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          </>
        )}
        
        {status === 'success' && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-green-600">
              Successfully Connected!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Redirecting back to integrations...
            </p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              Connection Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There was an error connecting to Amazon Seller Central.
            </p>
            <Button onClick={() => navigate('/integrations')}>
              Return to Integrations
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default AmazonCallback;
