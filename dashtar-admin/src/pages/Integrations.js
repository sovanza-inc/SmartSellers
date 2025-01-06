import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import PageTitle from '../components/Typography/PageTitle';
import { FaAmazon } from 'react-icons/fa';
import AmazonServices from '../services/AmazonServices';
import { notifyError } from '../utils/toast';

const IntegrationCard = ({ title, description, icon: Icon, connected = false, onConnect, loading }) => (
  <Card className="mb-4">
    <CardBody className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-4">
          <Icon className="w-8 h-8 text-[#FF9900]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <Button
        onClick={onConnect}
        disabled={loading}
        layout="outline"
        className={connected ? 'bg-green-50 text-green-600 border-green-600' : ''}
      >
        {loading ? 'Loading...' : connected ? 'Connected' : 'Connect'}
      </Button>
    </CardBody>
  </Card>
);

const Integrations = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setLoading(true);
      const { data } = await AmazonServices.getConnectionStatus();
      if (data) {
        setIsConnected(data.connected);
        if (data.connected && data.storeData) {
          setStoreData(data.storeData);
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      notifyError('Failed to check Amazon connection status');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      const { data } = await AmazonServices.getAuthUrl();
      if (data && data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        notifyError('Failed to get Amazon authorization URL');
      }
    } catch (error) {
      console.error('Error getting auth URL:', error);
      notifyError('Failed to connect to Amazon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle>Integrations</PageTitle>
      <div className="container grid gap-6 mx-auto">
        <IntegrationCard
          title="Amazon Seller Central"
          description={
            isConnected && storeData
              ? `Connected to ${storeData.marketplace} - Last synced: ${new Date(
                  storeData.lastSync
                ).toLocaleString()}`
              : 'Connect your Amazon Seller Central account to sync products'
          }
          icon={FaAmazon}
          connected={isConnected}
          onConnect={handleConnect}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Integrations;
