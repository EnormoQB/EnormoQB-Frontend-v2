import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Questions'],
  endpoints: (builder) => ({
    addQuestions: builder.mutation({
      query: (question) => ({
        url: ApiEndpoints.questions.add.url,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: question,
      }),
    }),
    generatePreview: builder.query({
      query: (questionPaper) => ({
        url: ApiEndpoints.questionPapers.preview.url,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: questionPaper,
      }),
    }),
    getQuestions: builder.query({
      query: ({ userId, status }) => {
        const params = new URLSearchParams({
          ...(userId ? { userId } : {}),
          ...(status ? { status } : {}),
        });
        return {
          url: `${ApiEndpoints.questions.list.url}?${params.toString()}`,
          method: 'get',
          providesTags: ['Questions'],
        };
      },
    }),
  }),
});

export const {
  useAddQuestionsMutation,
  useGetQuestionsQuery,
  useLazyGeneratePreviewQuery,
} = questionsApi;
