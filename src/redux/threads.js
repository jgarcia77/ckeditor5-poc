import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCommentThreads } from '../apis/commentThreadAPI';

export const readCommentThreads = createAsyncThunk('commenting/threads/read', async() => {
    return await getCommentThreads();
});

const initialState = {
    isIdle: true,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    data: []
};

const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(readCommentThreads.pending, (state) => {
            state.isIdle = false;
            state.isPending = true;
            state.isFulfilled = false;
            state.isRejected = false;
            state.data = [];
        });
        builder.addCase(readCommentThreads.rejected, (state) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = true;
            state.data = [];
        });
        builder.addCase(readCommentThreads.fulfilled, (state, action) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = true;
            state.isRejected = false;
            state.data = action.payload;
        });
    }
});

export const selectThreads = (state) => state.commenting.threads;

export default threadsSlice.reducer;