import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';

export const subjectApi = createApi({
  reducerPath: 'subjects',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Subjects'],
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: ApiEndpoints.subjects.sub.url,
        method: 'get',
        headers: {},
      }),
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectApi;
