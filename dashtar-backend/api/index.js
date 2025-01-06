require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const platformRoutes = require("../routes/platformRoutes");
const subscriptionRoutes = require("../routes/subscriptionRoutes");
const subscriptionAssignRoutes = require("../routes/subscriptionAssignRoutes");
const magentoRoutes = require("../routes/magentoRoutes");
const zidRoutes = require("../routes/zidRoutes");
const amazonRoutes = require("../routes/amazon");
const { isAuth, isAdmin } = require("../config/auth");

connectDB();
const app = express();
const cookieParser = require('cookie-parser');

// Use cookie-parser middleware
app.use(cookieParser());
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.use(cors());


//const receipt = tx.receipt; // the transaction receipt

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/customer/", customerRoutes);
app.use("/api/order/", isAuth, customerOrderRoutes);
app.use("/api/attributes/", attributeRoutes);
app.use("/api/setting/", settingRoutes);
app.use("/api/currency/", isAuth, currencyRoutes);
app.use("/api/language/", languageRoutes);
app.use("/api/subscription/", subscriptionRoutes);
app.use("/api/platform/", platformRoutes);
app.use("/api/language/", subscriptionAssignRoutes);
app.use("/api/magento/", magentoRoutes);
app.use("/api/zid/", zidRoutes);
app.use("/api/amazon/", amazonRoutes);
//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const axios = require('axios');

app.get('/magento-products', async (req, res) => {
  const magentoApiUrl = 'http://magento-store.shapito.tech/rest/V1/products?searchCriteria[pageSize]=100';
  const bearerToken = 'ovnm394sf23fpc740lvow0ddrpy7iq2c';

  try {
      const response = await axios.get(magentoApiUrl, {
          headers: {
              Authorization: `Bearer ${bearerToken}`,
          },
      });
      res.json(response.data);
  } catch (error) {
      console.error('Error fetching data from Magento:', error);
      res.status(500).json({ error: 'Failed to fetch data from Magento' });
  }
});

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

// const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));


//const express = require('express');
//const axios = require('axios');
const querystring = require('querystring');

//const app = express();

const CLIENT_ID = '2991'; // replace with actual client_id
const CLIENT_SECRET = 'n6wl760BugKzRa7Fs6NDAzeOmtxRJ0ei0ZuZZPsB'; // replace with actual client_secret
const REDIRECT_URI = 'https://fff7-116-90-121-26.ngrok-free.app/callback'; // replace with actual redirect_uri

// Redirect method
app.get('/redirect', (req, res) => {
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
  });

  const authorizationUrl = `https://oauth.zid.sa/oauth/authorize?${queryParams}`;
  res.redirect(authorizationUrl);
});

// Callback method
app.get('/callback', async (req, res) => {
  try {
    const code = req.query.code;
    const tokenResponse = await axios.post('https://oauth.zid.sa/oauth/token', querystring.stringify({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.send(tokenResponse.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
