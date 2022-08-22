import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  subjectsData: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSubjectsData: (state, action) => {
      state.subjectsData = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setSubjectsData } = userSlice.actions;
