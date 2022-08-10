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
    list: {
      method: 'GET',
      url: 'api/questions/list',
    },
  },
  questionPapers: {
    preview: {
      method: 'POST',
      url: 'api/questionPapers/preview',
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
