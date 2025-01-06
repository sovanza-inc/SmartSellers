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
const ProductServices = {
  getAllProducts: async ({ page, limit, category, title, price }) => {
    const adminId = getAdminIdFromCookie();

      console.log(adminId);

      // Check if adminId is available
      if (!adminId) {
        // Handle the scenario where adminId is not available
        console.error("Admin ID not found in cookie.");
        return;
      }
    const searchCategory = category !== null ? category : "";
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";

    return requests.get(
      `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}&adminId=${adminId}`
    );
  },

  getMagentoProducts: async ({ page, limit }) => {
 //   const url = `http://magento-store.shapito.tech/rest/V1/products?searchCriteria[pageSize]=${limit}&searchCriteria[currentPage]=${page}`;
    return requests.get('http://localhost:5000/magento-products');
  },

  getProductById: async (id) => {
    return requests.post(`/products/${id}`);
  },
  addProduct: async (body) => {
    return requests.post("/products/add", body);
  },
  addAllProducts: async (body) => {
    return requests.post("/products/all", body);
  },
  updateProduct: async (id, body) => {
    return requests.patch(`/products/${id}`, body);
  },
  updateManyProducts: async (body) => {
    return requests.patch("products/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/products/status/${id}`, body);
  },

  deleteProduct: async (id) => {
    return requests.delete(`/products/${id}`);
  },
  deleteManyProducts: async (body) => {
    return requests.patch("/products/delete/many", body);
  },
};

export default ProductServices;
