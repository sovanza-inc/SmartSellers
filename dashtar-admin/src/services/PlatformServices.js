import requests from './httpService';

const PlatformServices = {
  addPlatform: async (body) => {
    return requests.post('/platform', body);
  },

  getPlatform: async (id) => {
    return requests.get(`/platform/${id}`);
  },

  getAllPlatforms: async () => {
    return requests.get('/platform');
  },

  updatePlatform: async (id, body) => {
    return requests.put(`/platform/${id}`, body);
  },

  deletePlatform: async (id) => {
    return requests.delete(`/platform/${id}`);
  },
};

export default PlatformServices;
