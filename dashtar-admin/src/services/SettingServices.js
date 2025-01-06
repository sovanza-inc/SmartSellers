import requests from "./httpService";
import Cookies from 'js-cookie';

const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');

  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    console.log(parsedAdminInfo.name.en)
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null or handle the absence of adminId as per your application logic
};
const SettingServices = {
  // global setting all function
  addGlobalSetting: async (body) => {
    return requests.post("/setting/global/add", body);
  },

  getGlobalSetting: async () => {
    const adminId = getAdminIdFromCookie();

    console.log(adminId);

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    return requests.get(`/setting/global/all?adminId=${adminId}`);
  },

  updateGlobalSetting: async (body) => {
    const adminId = getAdminIdFromCookie();

    console.log(adminId);

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    const updatedBody = { ...body, adminId }; // Include adminId in the body
    return requests.put(`/setting/global/update`, updatedBody);
  },
};

export default SettingServices;
