import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  userQuestions: [],
};

export const questionSlice = createSlice({
  name: 'questionSlice',
  initialState,
  reducers: {
    setQuesion: (state, action) => {
      console.log(action.payload, 'hi');
      // console.log(action.payload);
      state.userQuestions.push(action.payload);
    },
  },
});

export default questionSlice.reducer;

export const { setQuestion } = questionSlice.actions;
