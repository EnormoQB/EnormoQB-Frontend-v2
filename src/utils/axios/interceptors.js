export const fulfilledInterceptor = (r) => r;

export const rejectedInterceptor = (error) => {
  console.log('Response Error: ', error);
  return Promise.reject(error);
};
