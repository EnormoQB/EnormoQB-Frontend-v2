import axios from 'axios';

import { fulfilledInterceptor, rejectedInterceptor } from './interceptors';

const ApiCaller = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

ApiCaller.interceptors.response.use(fulfilledInterceptor, rejectedInterceptor);

export default ApiCaller;
