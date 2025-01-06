const express = require('express');
const router = express.Router();
const { isAuth } = require('../config/auth');
const {
  getAuthUrl,
  handleCallback,
  getConnectionStatus,
  syncProducts,
} = require('../controller/amazon');

// Get Amazon OAuth URL
router.get('/auth-url', isAuth, getAuthUrl);

// Handle OAuth callback
router.post('/callback', isAuth, handleCallback);

// Get connection status
router.get('/connection-status', isAuth, getConnectionStatus);

// Sync products
router.post('/sync-products', isAuth, syncProducts);

module.exports = router;
