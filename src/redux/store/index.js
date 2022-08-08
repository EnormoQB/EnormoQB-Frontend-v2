import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../services/userApi';
import { questionsApi } from '../services/questionApi';
import userReducer from '../features/userSlice';
import questionReducer from '../features/questionSlice';
import { statsApi } from '../services/statsApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    questionState: questionReducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    questionsApi.middleware,
    userApi.middleware,
    statsApi.middleware,
  ],
});
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
