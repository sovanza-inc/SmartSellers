import requests from "./httpService";
import Cookies from 'js-cookie';

// Utility function to get admin ID from cookies
const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');
  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null if adminId is not found
};

const MagentoServices = {
  // Fetch all Magento store configurations
  getAllStores: async () => {
    const adminId = getAdminIdFromCookie();
    if (!adminId) {
      console.error("Admin ID not found in cookie.");
      return; // Handle as needed
    }
    return requests.get(`/magento/stores?adminId=${adminId}`);
  },

  // Save Magento store details
  createStore: async (storeDetails) => {
    return requests.post("/magento/stores", storeDetails);
  },

  // Get details of a particular user's Magento store configurations
  getStoresByUser: async () => {
    const adminId = getAdminIdFromCookie();
    if (!adminId) {
      console.error("Admin ID not found in cookie.");
      return; // Handle as needed
    }
    return requests.get(`/magento/stores/user/${adminId}`);
  },

  // Update Magento store details
  updateStore: async (id, storeDetails) => {
    return requests.patch(`/magento/stores/${id}`, storeDetails);
  },

  // Delete a Magento store configuration
  deleteStore: async (id) => {
    return requests.delete(`/magento/stores/${id}`);
  },

  // Additional service functions can be added here as needed
};

export default MagentoServices;
