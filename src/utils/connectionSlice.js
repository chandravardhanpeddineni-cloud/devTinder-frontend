import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connections: null,
    loading: null,
    error: null,
}
const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        loading: (state) => {
            state.loading = true
        },
        success: (state, action) => {
            state.loading = false,
            state.connections = action.payload
        },
        failure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        }
    }
});

export const {loading, success, failure} = connectionSlice.actions;

export default connectionSlice.reducer;