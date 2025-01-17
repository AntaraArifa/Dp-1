import { createSlice } from '@reduxjs/toolkit';

// Initial state for the resume slice
const initialState = {
  selectedTemplate: null,
};

// Create the slice with reducers and actions
const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    // Action to set the selected template
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

// Export the action so it can be dispatched from TemplateSelector
export const { setSelectedTemplate } = resumeSlice.actions;

// Export the reducer to be combined in the store
export default resumeSlice.reducer;
