// File: ZidRoutes.js

const express = require('express');
const router = express.Router();
const zidController = require('../controller/zid/zidController'); // Adjust the path as necessary

// Define routes for Zid operations
router.get('/stores/', zidController.getAllZids);
router.post('/stores/', zidController.createZid);
router.get('/stores/user/:adminId', zidController.getZidByStore); // Assuming you want to fetch Zid records by storeId
router.patch('/stores/:id', zidController.updateZid);
router.delete('/stores/:id', zidController.deleteZid);

module.exports = router;
