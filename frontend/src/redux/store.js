import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import slices
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import chatSlice from "./chatSlice";
import messageSlice from "./messageSlice";
import resumeSlice from './resumeSlice';
import notificationSlice from './notificationSlice';
import assessmentSlice from './assessmentSlice'; // ✅ Import assessmentSlice

// Persist config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
    chat: chatSlice,
    message: messageSlice,
    resume: resumeSlice,
    notification: notificationSlice,
    assessment: assessmentSlice, // ✅ Add assessment to the root reducer
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
