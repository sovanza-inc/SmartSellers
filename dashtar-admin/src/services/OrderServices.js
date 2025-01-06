import requests from "./httpService";
import Cookies from 'js-cookie';
const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');

  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null or handle the absence of adminId as per your application logic
};
const OrderServices = {
  getAllOrders: async ({
    body,
    headers,
    customerName,
    status,
    page = 1,
    limit = 8,
    day,
    startDate,
    endDate,
  }) => {
    const adminId = getAdminIdFromCookie();

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    const searchName = customerName !== null ? customerName : "";
    const searchStatus = status !== null ? status : "";
    const searchDay = day !== null ? day : "";
    const startD = startDate !== null ? startDate : "";
    const endD = endDate !== null ? endDate : "";

    return requests.get(
      `/orders?customerName=${searchName}&status=${searchStatus}&day=${searchDay}&page=${page}&limit=${limit}&startDate=${startD}&endDate=${endD}&adminId=${adminId}`,
      body,
      headers
    );
  },

  getAllOrdersTwo: async ({ invoice, body, headers }) => {
    const searchInvoice = invoice !== null ? invoice : "";
    return requests.get(`/orders/all?invoice=${searchInvoice}`, body, headers);
  },

  getRecentOrders: async ({
    page = 1,
    limit = 8,
    startDate = "1:00",
    endDate = "23:59",
  }) => {
    return requests.get(
      `/orders/recent?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`
    );
  },

  getOrderCustomer: async (id, body) => {
    return requests.get(`/orders/customer/${id}`, body);
  },

  getOrderById: async (id, body) => {
    return requests.get(`/orders/${id}`, body);
  },

  updateOrder : async (id, body, headers) => {
    const adminId = getAdminIdFromCookie();

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    // Add adminId to the body
    const modifiedBody = {
      ...body,
      adminId: adminId, // Adding adminId: 1 to the request body
    };

    // Make the PUT request with the modified body
    return requests.put(`/orders/${id}`, modifiedBody, headers);
  },


  deleteOrder: async (id) => {
    return requests.delete(`/orders/${id}`);
  },

  getDashboardOrdersData: async ({
    page = 1,
    limit = 8,
    endDate = "23:59",
  }) => {
    const adminId = getAdminIdFromCookie();

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    return requests.get(
      `/orders/dashboard?page=${page}&limit=${limit}&endDate=${endDate}&adminId=${adminId}`
    );
  },

  getDashboardAmount: async () => {
    return requests.get("/orders/dashboard-amount");
  },

  getDashboardCount: async () => {
    return requests.get("/orders/dashboard-count");
  },

  getDashboardRecentOrder: async ({ page = 1, limit = 8 }) => {
    const adminId = getAdminIdFromCookie();

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    return requests.get(
      `/orders/dashboard-recent-order?page=${page}&limit=${limit}&adminId=${adminId}`
    );
  },

  getBestSellerProductChart: async () => {
    return requests.get("/orders/best-seller/chart");
  },
};

export default OrderServices;
