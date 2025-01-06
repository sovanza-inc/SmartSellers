import requests from './httpService';

const SubscriptionServices = {
  addSubscription: async (body) => {
    return requests.post('/subscription', body);
  },

  getSubscription: async (id) => {
    return requests.get(`/subscription/${id}`);
  },

  getAllSubscriptions: async () => {
    return requests.get('/subscription');
  },

  updateSubscription: async (id, body) => {
    console.log("id + " + id)
    return requests.put(`/subscription/${id}`, body);
  },

  deleteSubscription: async (id) => {
    console.log(id + "vggggggggggggggggggggggggggggggggggggggggggggg")
    return requests.delete(`/subscription/${id}`);
  },
};

export default SubscriptionServices;
