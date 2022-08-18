import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateForm: null,
  previewData: [],
  customQues: [],
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
    setCustomQues: (state, action) => {
      state.customQues = action.payload;
    },
  },
});

export default generateFormSlice.reducer;

export const { clear, setFormData, setPreviewData, setCustomQues } =
  generateFormSlice.actions;
