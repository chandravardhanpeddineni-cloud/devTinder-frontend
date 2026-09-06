import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;