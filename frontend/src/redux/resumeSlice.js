//resumeSlice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
  resumeData: null,
  singleResume: null, // Added to store single resume data
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
    setSingleResume: (state, action) => {
      state.singleResume = action.payload; // Updates the state with single resume data
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
      state.singleResume = null; // Clear single resume data
      state.selectedTemplate = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  setSelectedTemplate,
  setResumeData,
  setSingleResume, // Export the new action
  setLoading,
  setError,
  clearError,
  clearResumeData,
} = resumeSlice.actions;

export default resumeSlice.reducer;