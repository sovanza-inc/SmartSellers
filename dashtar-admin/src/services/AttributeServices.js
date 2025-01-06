import requests from './httpService';
import Cookies from 'js-cookie';

const getAdminIdFromCookie = () => {
  const adminInfo = Cookies.get('adminInfo');

  if (adminInfo) {
    const parsedAdminInfo = JSON.parse(adminInfo);
    return parsedAdminInfo._id; // Assuming _id is the adminId
  }
  return null; // Return null or handle the absence of adminId as per your application logic
};

const AttributeServices = {
  getAllAttributes: async ({ type, option, option1 }) => {
    const adminId = getAdminIdFromCookie();

    console.log(adminId);

    // Check if adminId is available
    if (!adminId) {
      // Handle the scenario where adminId is not available
      console.error("Admin ID not found in cookie.");
      return;
    }
    return requests.get(
      `/attributes?type=${type}&option=${option}&option1=${option1}&adminId=${adminId}`
    );
  },

  getShowingAttributes: async (body) => {
    return requests.get('/attributes/show', body);
  },

  addAttribute: async (body) => {
    return requests.post('/attributes/add', body);
  },

  addChildAttribute: async (id, body) => {
    return requests.put(`/attributes/add/child/${id}`, body);
  },

  addAllAttributes: async (body) => {
    return requests.post('/attributes/add/all', body);
  },

  getAttributeById: async (id) => {
    return requests.get(`/attributes/${id}`);
  },

  getChildAttributeById: async ({ id, ids }) => {
    return requests.get(`/attributes/child/${id}/${ids}`);
  },

  updateAttributes: async (id, body) => {
    return requests.put(`/attributes/${id}`, body);
  },

  updateChildAttributes: async ({ id, ids }, body) => {
    return requests.put(`/attributes/update/child/${ids}/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/attributes/status/${id}`, body);
  },

  updateChildStatus: async (id, body) => {
    return requests.put(`/attributes/status/child/${id}`, body);
  },

  deleteAttribute: async (id, body) => {
    return requests.delete(`/attributes/${id}`, body);
  },

  deleteChildAttribute: async ({ id, ids }, body) => {
    return requests.put(`/attributes/delete/child/${ids}/${id}`, body);
  },

  updateManyAttribute: async (body) => {
    return requests.patch('/attributes/update/many', body);
  },

  updateManyChildAttribute: async (body) => {
    return requests.patch('/attributes/update/child/many', body);
  },

  deleteManyAttribute: async (body) => {
    return requests.patch('/attributes/delete/many', body);
  },

  deleteManyChildAttribute: async (body) => {
    return requests.patch('/attributes/delete/child/many', body);
  },
};

export default AttributeServices;
