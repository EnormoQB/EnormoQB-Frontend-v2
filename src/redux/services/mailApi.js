import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';

export const mailApi = createApi({
  reducerPath: 'mailApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Mail'],
  endpoints: (builder) => ({
    sendMail: builder.query({
      query: (data) => {
        const params = new URLSearchParams(data);
        return {
          url: `${ApiEndpoints.mail.requestmail.url}?${params.toString()}`,
          method: 'get',
          provideTags: ['MailSender'],
        };
      },
    }),
  }),
});

export const { useLazySendMailQuery } = mailApi;
