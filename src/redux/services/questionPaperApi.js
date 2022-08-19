import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import { setPreviewData } from '../features/generateSlice';
import axiosBaseQuery from './axiosBaseQuery';

export const questionPaperApi = createApi({
  reducerPath: 'questionPaperApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['QuestionPaper'],
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
    generatePdf: builder.query({
      query: (questionPaper) => ({
        url: ApiEndpoints.questionPapers.generate.url,
        method: 'post',
        data: questionPaper,
      }),
    }),
    previousYearPaper: builder.query({
      query: () => ({
        url: ApiEndpoints.questionPapers.previous.url,
        method: 'get',
        providesTags: ['PreviousYear'],
      }),
    }),
    userPaperHistory: builder.query({
      query: () => ({
        url: ApiEndpoints.questionPapers.history.url,
        method: 'get',
        providesTags: ['PaperHistory'],
      }),
    }),
  }),
});

export const {
  useLazyGeneratePreviewQuery,
  useLazyGeneratePdfQuery,
  usePreviousYearPaperQuery,
  useUserPaperHistoryQuery,
} = questionPaperApi;
