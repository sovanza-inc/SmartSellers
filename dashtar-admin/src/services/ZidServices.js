import requests from "./httpService"; // Assuming this is a setup for handling HTTP requests
import Cookies from 'js-cookie';

// Utility function to get the admin ID from cookies, identical to MagentoServices
const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');
  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null if adminId is not found
};

const ZidServices = {
  // Fetch all Zid records
  getAllZids: async () => {
    const adminId = getAdminIdFromCookie();
    if (!adminId) {
      console.error("Admin ID not found in cookie.");
      return; // Handle as needed
    }
    return requests.get(`/zid/stores?adminId=${adminId}`);
  },

  // Save Zid record details
  createZid: async (zidDetails) => {
    return requests.post("/zid/stores", zidDetails);
  },

  // Get details of a particular Zid record by store
  getZidByStore: async (storeId) => {
    const adminId = getAdminIdFromCookie();
    if (!adminId) {
      console.error("Admin ID not found in cookie.");
      return; // Handle as needed
    }
    return requests.get(`/zid/stores/${storeId}?adminId=${adminId}`);
  },

  getStoresByUser: async () => {
    const adminId = getAdminIdFromCookie();
    if (!adminId) {
      console.error("Admin ID not found in cookie.");
      return; // Handle as needed
    }
    return requests.get(`/zid/stores/user/${adminId}`);
  },

  // Update Zid record details
  updateZid: async (id, zidDetails) => {
    return requests.patch(`/zid/stores/${id}`, zidDetails);
  },

  // Delete a Zid record
  deleteZid: async (id) => {
    return requests.delete(`/zid/stores/${id}`);
  },

  // Additional service functions can be added here as needed
};

export default ZidServices;
