const ApiEndpoints = {
  auth: {
    logout: {
      method: 'GET',
      url: '/auth/logout',
    },
    login: {
      method: 'GET',
      url: '/auth/google',
    },
    user: {
      method: 'GET',
      url: '/auth/user',
    },
  },
  questions: {
    add: {
      method: 'POST',
      url: 'api/questions/add',
    },
  },
};

export default ApiEndpoints;
