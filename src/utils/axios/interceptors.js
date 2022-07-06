export const fulfilledInterceptor = (r) => r

export const rejectedInterceptor = (error) => {
  // eslint-disable-next-line no-console
  console.log('Response Error: ', error)
  return Promise.reject(error)
}
