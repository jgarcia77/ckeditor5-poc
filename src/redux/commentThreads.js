import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { getCommentThreads } from '../apis/commentThreadAPI';

const commentThreadsAdapter = createEntityAdapter({
    selectId: (commentThread) => commentThread.threadId
});

export const readCommentThreads = createAsyncThunk('commenting/commentThreads/read', async() => {
    return await getCommentThreads();
});

const commentThreadsSlice = createSlice({
    name: 'commentThreads',
    initialState: commentThreadsAdapter.getInitialState({
        isIdle: true,
        isPending: false,
        isFulfilled: false,
        isRejected: false,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(readCommentThreads.pending, (state) => {
            state.isIdle = false;
            state.isPending = true;
            state.isFulfilled = false;
            state.isRejected = false;
        });
        builder.addCase(readCommentThreads.rejected, (state) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = true;
        });
        builder.addCase(readCommentThreads.fulfilled, (state, action) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = true;
            state.isRejected = false;
            commentThreadsAdapter.setAll(state, action.payload);
        });
    }
});

export const commentThreadsSelectors = {
    ...commentThreadsAdapter.getSelectors(state => state.commenting.commentThreads),
    selectStates: state => {
        const slice = state.commenting.commentThreads;

        return {
            isIdle: slice.isIdle,
            isPending: slice.isPending,
            isFulfilled: slice.isFulfilled,
            isRejected: slice.isRejected
        };
    }
};

export default commentThreadsSlice.reducer;