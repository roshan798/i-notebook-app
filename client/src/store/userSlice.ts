import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './types';

// Initial state
const initialState: UserState = {
    user: null,
};

// Create the slice with proper typing
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        }
    },
});

export const { setUser,logout } = userSlice.actions;

export default userSlice.reducer;
