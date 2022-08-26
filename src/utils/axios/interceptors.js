export const fulfilledInterceptor = (r) => r;

export const rejectedInterceptor = (error) => {
  console.log('Response Error: ', error);
  if (error.response.status === 401 && window.location.pathname !== '/') {
    window.location.href = '/';
  }
  return Promise.reject(error);
};
