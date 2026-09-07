import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    feedData: null,
    error: null,
}
const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        feedRequest: (state) => {
            state.loading = true
        },
        feedSuccess: (state, action) => {
            state.loading = false,
            state.feedData = action.payload
        },
        feedFail: (state, action) => {
            state.loading = false,
            state.feedData = null,
            state.error = action.payload
        }
    }   
});

export const { feedRequest, feedSuccess, feedFail } = feedSlice.actions;

export default feedSlice.reducer;