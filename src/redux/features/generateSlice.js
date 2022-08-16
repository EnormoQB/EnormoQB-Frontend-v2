import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateForm: null,
  previewData: null,
};

export const generateFormSlice = createSlice({
  name: 'generateFormSlice',
  initialState,
  reducers: {
    clear: () => initialState,
    setFormData: (state, action) => {
      state.generateForm = action.payload;
    },
    setPreviewData: (state, action) => {
      state.previewData = action.payload;
    },
  },
});

export default generateFormSlice.reducer;

export const { clear, setFormData, setPreviewData } = generateFormSlice.actions;
