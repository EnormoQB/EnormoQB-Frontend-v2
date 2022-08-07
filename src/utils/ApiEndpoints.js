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
    accept: {
      method: 'GET',
      url: 'api/questions/list',
    },
  },
  stats: {
    get: {
      method: 'GET',
      url: 'api/questions/stats',
    },
  },
};

export default ApiEndpoints;
