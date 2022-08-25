import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import { setSubjectsData } from '../features/userSlice';
import axiosBaseQuery from './axiosBaseQuery';

export const subjectApi = createApi({
  reducerPath: 'subjects',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Subjects'],
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => ({
        url: ApiEndpoints.subjects.getData.url,
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSubjectsData(data.data.subjects));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectApi;
