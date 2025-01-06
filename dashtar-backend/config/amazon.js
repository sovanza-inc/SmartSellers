exports.amazonConfig = {
  appId: process.env.AMAZON_APP_ID,
  clientId: process.env.AMAZON_CLIENT_ID,
  clientSecret: process.env.AMAZON_CLIENT_SECRET,
  redirectUri: process.env.AMAZON_REDIRECT_URI || 'http://localhost:3000/amazon/callback',
  // Updated OAuth endpoints
  authEndpoint: 'https://sellercentral.amazon.com/apps/authorize/consent',
  tokenEndpoint: 'https://api.amazon.com/auth/o2/token',
  sellerEndpoint: 'https://api.amazon.com/sellers/v1/me',
  spApiEndpoint: 'https://sellingpartnerapi.amazon.com',
};
