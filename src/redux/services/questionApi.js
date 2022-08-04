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
    getQuestions: builder.query({
      query: () => ({
        url: `${ApiEndpoints.questions.accept.url}`,
        method: 'get',
        providesTags: ['Questions'],
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setQuestion(data.data.items));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useAddQuestionsMutation, useGetQuestionsQuery } = questionsApi;
