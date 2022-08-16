import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
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
  usePreviousYearPaperQuery,
  useUserPaperHistoryQuery,
} = questionPaperApi;
