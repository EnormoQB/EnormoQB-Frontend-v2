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
    reserved: {
      method: 'GET',
      url: 'api/questions/reserved',
    },
    feedback: {
      method: 'PATCH',
      url: 'api/questions/update/feedback',
    },
  },
  questionPapers: {
    preview: {
      method: 'POST',
      url: 'api/questionPapers/preview',
    },
    previous: {
      method: 'GET',
      url: 'api/questionPapers/previousyear',
    },
    history: {
      method: 'GET',
      url: 'api/questionPapers/userpapers',
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
