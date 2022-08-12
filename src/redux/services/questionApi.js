import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndpoints from '../../utils/ApiEndpoints';
import axiosBaseQuery from './axiosBaseQuery';
import { setQuestion } from '../features/questionSlice';

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
    generateQuesPaper: builder.mutation({
      query: (questionPaper) => ({
        url: ApiEndpoints.questions.generate.url,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: questionPaper,
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
          url: `${ApiEndpoints.questions.accept.url}?${params.toString()}`,
          method: 'get',
          providesTags: ['Questions'],
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setQuestion(data.data.items));
        } catch (error) {
          // console.error(error);
        }
      },
    }),
  }),
});

export const {
  useAddQuestionsMutation,
  useGetQuestionsQuery,
  useGenerateQuesPaperMutation,
} = questionsApi;
