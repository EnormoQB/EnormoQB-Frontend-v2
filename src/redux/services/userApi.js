import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';
import { setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: 'getUser',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({ url: ApiEndpoints.auth.user.url, method: 'get' }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    toggleStatus: builder.mutation({
      query: (data) => ({
        url: ApiEndpoints.auth.toggleStatus.url,
        method: 'post',
        data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: ApiEndpoints.auth.logout.url, method: 'get' }),
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
  useLogoutUserMutation,
  useToggleStatusMutation,
} = userApi;
