import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: null,
    requests: null,
    error: null
}

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true;
        },
        success: (state, action) => {
            state.loading = false,
            state.requests = action.payload
        },
        failure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        removeRequest: (state, action) => {
            state.requests = state.requests.filter(
                request => request._id !== action.payload
            )
        }
    }
})

export const {loading, success, failure, removeRequest} = requestSlice.actions;

export default requestSlice.reducer;