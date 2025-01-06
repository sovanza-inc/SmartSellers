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

const CategoryServices = {
  getAllCategory: async () => {
    const adminId = getAdminIdFromCookie();

    console.log(adminId);

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    return requests.get(`/category?adminId=${adminId}`);
  },

  getAllCategories: async () => {
    return requests.get("/category/all");
  },

  getCategoryById: async (id) => {
    return requests.get(`/category/${id}`);
  },

  addCategory: async (body) => {
    return requests.post("/category/add", body);
  },

  addAllCategory: async (body) => {
    return requests.post("/category/add/all", body);
  },

  updateCategory: async (id, body) => {
    return requests.put(`/category/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory: async (id, body) => {
    return requests.delete(`/category/${id}`, body);
  },

  updateManyCategory: async (body) => {
    return requests.patch("/category/update/many", body);
  },

  deleteManyCategory: async (body) => {
    return requests.patch("/category/delete/many", body);
  },
};

export default CategoryServices;
