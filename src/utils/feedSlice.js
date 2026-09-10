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
        },
        removeFeed: (state, action) => {
            state.feedData = state.feedData.filter(
                user => user._id !== action.payload
            )
        }
    }   
});

export const { feedRequest, feedSuccess, feedFail, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;