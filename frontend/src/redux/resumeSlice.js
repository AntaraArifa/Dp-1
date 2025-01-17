import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
  resumeData: null,
  error: null,
  loading: false,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setResumeData: (state, action) => {
      state.resumeData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload ?? true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResumeData: (state) => {
      state.resumeData = null;
      state.selectedTemplate = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setSelectedTemplate,
  setResumeData,
  setLoading,
  setError,
  clearError,
  clearResumeData,
} = resumeSlice.actions;

export default resumeSlice.reducer;
