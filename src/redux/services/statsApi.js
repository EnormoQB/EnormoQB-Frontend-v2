import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Stats'],
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: ApiEndpoints.stats.accept.url,
        method: 'get',
        headers: {},
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
