import axios from 'axios'

import { fulfilledInterceptor, rejectedInterceptor } from './interceptors'

const RestApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

RestApi.interceptors.response.use(fulfilledInterceptor, rejectedInterceptor)

export default RestApi
