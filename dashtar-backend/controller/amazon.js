const crypto = require('crypto');
const axios = require('axios');
const Admin = require('../models/Admin');
const { amazonConfig } = require('../config/amazon');

// Store state parameters temporarily (in production, use Redis or a database)
const stateStore = new Map();

exports.getAuthUrl = async (req, res) => {
  try {
    const state = crypto.randomBytes(16).toString('hex');
    stateStore.set(state, { timestamp: Date.now() });

    const params = new URLSearchParams({
      application_id: amazonConfig.appId,
      state,
      version: 'beta',
      redirect_uri: amazonConfig.redirectUri,
    });

    const authUrl = `${amazonConfig.authEndpoint}?${params.toString()}`;
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ message: 'Failed to generate authorization URL' });
  }
};

exports.handleCallback = async (req, res) => {
  try {
    const { code, state } = req.body;

    // Verify state parameter
    const storedState = stateStore.get(state);
    if (!storedState) {
      return res.status(400).json({ message: 'Invalid state parameter' });
    }
    stateStore.delete(state);

    // Exchange code for access token
    const tokenResponse = await axios.post(amazonConfig.tokenEndpoint, 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: amazonConfig.redirectUri,
        client_id: amazonConfig.clientId,
        client_secret: amazonConfig.clientSecret,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Get seller info
    const sellerResponse = await axios.get(amazonConfig.sellerEndpoint, {
      headers: { 
        Authorization: `Bearer ${access_token}`,
        'x-amz-access-token': access_token,
      },
    });

    // Store the connection info in the admin's record
    await Admin.findByIdAndUpdate(req.user._id, {
      amazonConnection: {
        accessToken: access_token,
        refreshToken: refresh_token,
        sellerId: sellerResponse.data.seller_id,
        marketplace: sellerResponse.data.marketplace,
        lastSync: new Date(),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error handling callback:', error);
    res.status(500).json({ message: 'Failed to complete Amazon integration', error: error.message });
  }
};

exports.getConnectionStatus = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    const connected = !!(admin?.amazonConnection?.accessToken);

    if (connected) {
      res.json({
        connected: true,
        storeData: {
          storeName: admin.amazonConnection.storeName,
          marketplace: admin.amazonConnection.marketplace,
          lastSync: admin.amazonConnection.lastSync,
        },
      });
    } else {
      res.json({ connected: false });
    }
  } catch (error) {
    console.error('Error checking connection status:', error);
    res.status(500).json({ message: 'Failed to check connection status' });
  }
};

exports.syncProducts = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id);
    if (!admin?.amazonConnection?.accessToken) {
      return res.status(400).json({ message: 'Not connected to Amazon' });
    }

    // Get products from Amazon SP-API
    const products = await getAmazonProducts(admin.amazonConnection.accessToken);

    // Process and store products
    // ... implement your product sync logic here ...

    res.json({ success: true, message: 'Products synced successfully' });
  } catch (error) {
    console.error('Error syncing products:', error);
    res.status(500).json({ message: 'Failed to sync products' });
  }
};

async function getAmazonProducts(accessToken) {
  // Implement SP-API call to get products
  // This is a placeholder - you'll need to implement the actual SP-API calls
  try {
    const response = await axios.get(amazonConfig.spApiEndpoint + '/catalog/products', {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'x-amz-access-token': accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Amazon products:', error);
    throw error;
  }
}
