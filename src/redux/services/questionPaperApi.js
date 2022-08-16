import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import { setPreviewData } from '../features/generateSlice';
import axiosBaseQuery from './axiosBaseQuery';

export const questionPaperApi = createApi({
  reducerPath: 'questionPaperApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    generatePreview: builder.query({
      query: (questionPaper) => ({
        url: ApiEndpoints.questionPapers.preview.url,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: questionPaper,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log(data);
          dispatch(setPreviewData(data?.data?.data || []));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLazyGeneratePreviewQuery } = questionPaperApi;
