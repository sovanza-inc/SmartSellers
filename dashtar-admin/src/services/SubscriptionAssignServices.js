import requests from './httpService';

const SubscriptionAssignServices = {
  assignSubscription: async (body) => {
    return requests.post('/subscriptionAssign/add', body);
  },

  getSubscriptionAssign: async (id) => {
    return requests.get(`/subscriptionAssign/${id}`);
  },

  getAllSubscriptionAssigns: async () => {
    return requests.get('/subscriptionAssign');
  },

  updateSubscriptionAssign: async (id, body) => {
    return requests.put(`/subscriptionAssign/${id}`, body);
  },

  deleteSubscriptionAssign: async (id) => {
    return requests.delete(`/subscriptionAssign/${id}`);
  },
};

export default SubscriptionAssignServices;
