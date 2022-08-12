import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateForm: null,
};

export const generateFormSlice = createSlice({
  name: 'generateFormSlice',
  initialState,
  reducers: {
    clear: () => initialState,
    setFormData: (state, action) => {
      state.generateForm = action.payload;
    },
  },
});

export default generateFormSlice.reducer;

export const { clear, setFormData } = generateFormSlice.actions;
