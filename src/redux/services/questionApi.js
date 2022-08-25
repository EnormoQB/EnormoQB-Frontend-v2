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
        headers: {
          'content-type': 'multipart/form-data',
        },
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
    reservedQuestions: builder.query({
      query: () => {
        return {
          url: `${ApiEndpoints.questions.reserved.url}`,
          method: 'get',
        };
      },
    }),
    switchQuestion: builder.query({
      query: ({ id }) => {
        const params = new URLSearchParams({ id });
        return {
          url: `${ApiEndpoints.questions.switch.url}?${params.toString()}`,
          method: 'get',
        };
      },
    }),
    getQuestions: builder.query({
      query: ({ status, standard, subject, topics, difficulty, page }) => {
        const params = new URLSearchParams({
          ...(status ? { status } : {}),
          ...(standard ? { standard } : {}),
          ...(subject ? { subject } : {}),
          ...(topics ? { topics } : {}),
          ...(difficulty ? { difficulty } : {}),
          ...(page ? { page } : 1),
        });
        return {
          url: `${ApiEndpoints.questions.list.url}?${params.toString()}`,
          method: 'get',
          providesTags: ['Questions'],
        };
      },
    }),
    feedbackupdate: builder.mutation({
      query: ({ feedback, id, status }) => {
        return {
          url: `${ApiEndpoints.questions.feedback.url}/${id}`,
          method: 'patch',
          data: { feedback, status },
          invalidatesTags: ['Questions'],
        };
      },
    }),
    questionsPerTopic: builder.query({
      query: ({ subject, standard }) => {
        const params = new URLSearchParams({
          ...(standard ? { standard } : {}),
          ...(subject ? { subject } : {}),
        });
        return {
          url: `${ApiEndpoints.questions.perTopic.url}?${params.toString()}`,
          method: 'get',
        };
      },
    }),
    deleteQuestion: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${ApiEndpoints.questions.delete.url}/${id}`,
          method: 'delete',
          invalidatesTags: ['Questions'],
        };
      },
    }),
  }),
});

export const {
  useAddQuestionsMutation,
  useGetQuestionsQuery,
  useLazyGeneratePreviewQuery,
  useReservedQuestionsQuery,
  useLazySwitchQuestionQuery,
  useFeedbackupdateMutation,
  useQuestionsPerTopicQuery,
  useDeleteQuestionMutation,
} = questionsApi;
