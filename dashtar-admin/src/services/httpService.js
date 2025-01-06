import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let adminInfo;
  if (Cookies.get('adminInfo')) {
    adminInfo = JSON.parse(Cookies.get('adminInfo'));
  }

  let company;
  if (Cookies.get('company')) {
    company = Cookies.get('company');
  }

  return {
    ...config,
    headers: {
      authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
      company: company || null,
    },
  };
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const requests = {
  get: async (url) => {
    const response = await instance.get(url);
    return response;
  },

  post: async (url, body) => {
    const response = await instance.post(url, body);
    return response;
  },

  put: async (url, body) => {
    const response = await instance.put(url, body);
    return response;
  },

  patch: async (url, body) => {
    const response = await instance.patch(url, body);
    return response;
  },

  delete: async (url) => {
    const response = await instance.delete(url);
    return response;
  },
};

export default requests;
