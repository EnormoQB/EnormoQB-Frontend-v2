import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../services/userApi';
import { questionsApi } from '../services/questionApi';
import { questionPaperApi } from '../services/questionPaperApi';
import userReducer from '../features/userSlice';
import generateFormReducer from '../features/generateSlice';
import { statsApi } from '../services/statsApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [questionPaperApi.reducerPath]: questionPaperApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    generateState: generateFormReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    questionsApi.middleware,
    questionPaperApi.middleware,
    userApi.middleware,
    statsApi.middleware,
  ],
});
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
