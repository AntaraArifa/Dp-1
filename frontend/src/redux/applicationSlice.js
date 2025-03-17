import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: null,
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        removeApplicant: (state, action) => {
            state.applicants.applications = state.applicants.applications.filter(
                (applicant) => applicant._id !== action.payload
            );
        },
        updateApplicantStatus: (state, action) => {
            const { id, status } = action.payload;
            const applicant = state.applicants.applications.find(
                (applicant) => applicant._id === id
            );
            if (applicant) {
                applicant.status = status; // Update the applicant's status
            }
        },
    },
});

export const { setAllApplicants, removeApplicant,updateApplicantStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
