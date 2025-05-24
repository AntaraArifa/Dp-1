// src/redux/assessmentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const assessmentSlice = createSlice({
  name: "assessment",
  initialState: {
    assessments: [],
    loadingStatus: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setAssessments: (state, action) => {
      state.assessments = action.payload;
    },
    addAssessment: (state, action) => {
      state.assessments.push(action.payload);
    },
    removeAssessment: (state, action) => {
      state.assessments = state.assessments.filter(a => a.id !== action.payload);
    },
    setAssessmentLoadingStatus: (state, action) => {
      state.loadingStatus = action.payload;
    },
    setAssessmentError: (state, action) => {
      state.error = action.payload;
    },
    clearAssessmentState: (state) => {
      state.assessments = [];
      state.loadingStatus = "idle";
      state.error = null;
    },
  },
});

export const {
  setAssessments,
  addAssessment,
  removeAssessment,
  setAssessmentLoadingStatus,
  setAssessmentError,
  clearAssessmentState,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
