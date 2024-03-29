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
    toggleStatus: {
      method: 'POST',
      url: '/auth/toggleStatus',
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
      url: 'api/questions/update',
    },
    perTopic: {
      method: 'GET',
      url: 'api/questions/perTopic',
    },
    switch: {
      method: 'GET',
      url: 'api/questions/switch',
    },
    delete: {
      method: 'DELETE',
      url: 'api/questions/delete',
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
    generate: {
      method: 'POST',
      url: 'api/questionPapers/generatePaper',
    },
    history: {
      method: 'GET',
      url: 'api/questionPapers/userpapers',
    },
    convert: {
      method: 'POST',
      url: 'api/questionPapers/convert',
    },
  },
  stats: {
    get: {
      method: 'GET',
      url: 'api/questions/stats',
    },
  },
  subjects: {
    getData: {
      method: 'GET',
      url: 'api/subjectsData',
    },
  },
  mail: {
    requestmail: {
      method: 'GET',
      url: 'api/mail/request',
    },
  },
};

export default ApiEndpoints;
