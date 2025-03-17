import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],  // Array to store notifications
        loadingStatus: "idle",  // Status of loading notifications (idle, loading, succeeded, failed)
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;  // Set notifications from payload
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload);  // Add a new notification to the array
        },
        setLoadingStatus: (state, action) => {
            state.loadingStatus = action.payload;  // Set the loading status (e.g., "loading", "succeeded", "failed")
        },
        clearNotifications: (state) => {
            state.notifications = [];  // Clear all notifications
        },
    },
});

export const {
    setNotifications,
    addNotification,
    setLoadingStatus,
    clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
