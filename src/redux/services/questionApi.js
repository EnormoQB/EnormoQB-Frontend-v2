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
    getQuestions: builder.query({
      query: ({ userId, status, standard, subject, topics, difficulty }) => {
        const params = new URLSearchParams({
          ...(userId ? { userId } : {}),
          ...(status ? { status } : {}),
          ...(standard ? { standard } : {}),
          ...(subject ? { subject } : {}),
          ...(topics ? { topics } : {}),
          ...(difficulty ? { difficulty } : {}),
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
