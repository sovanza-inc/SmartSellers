import requests from './httpService';

const AmazonServices = {
  async getConnectionStatus() {
    const response = await requests.get('/amazon/connection-status');
    return response;
  },

  async getAuthUrl() {
    const response = await requests.get('/amazon/auth-url');
    return response;
  },

  async handleCallback(code, state) {
    const response = await requests.post('/amazon/callback', { code, state });
    return response;
  },

  async syncProducts() {
    const response = await requests.post('/amazon/sync-products');
    return response;
  },
};

export default AmazonServices;
