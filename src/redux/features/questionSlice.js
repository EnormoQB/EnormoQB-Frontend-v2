import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userQuestions: [],
};

export const questionSlice = createSlice({
  name: 'questionSlice',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.userQuestions.push(action.payload);
    },
  },
});

export default questionSlice.reducer;

export const { setQuestion } = questionSlice.actions;
