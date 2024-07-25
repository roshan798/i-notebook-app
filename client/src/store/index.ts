import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import notesReducer from './notesSlice';

// Configure the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
        notesStore: notesReducer,
    },
});

// Define TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
