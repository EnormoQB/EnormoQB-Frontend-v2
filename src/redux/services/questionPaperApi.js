import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
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
    }),
  }),
});

export const { useLazyGeneratePreviewQuery } = questionPaperApi;
