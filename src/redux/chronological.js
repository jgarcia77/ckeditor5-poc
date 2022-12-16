import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
    commentThreadToRemove: null
};

const chronologicalSlice = createSlice({
    name: 'chronological',
    initialState,
    reducers: {
        addChronComment: (state, action) => {
            state.commentToAdd = action.payload;
        },
        resetAddChronComment: (state) => {
            state.commentToAdd = null;
        },
        updateChronComment: (state, action) => {
            state.commentToUpdate = action.payload;
        },
        resetUpdateChronComment: (state) => {
            state.commentToUpdate = null;
        },
        removeChronComment: (state, action) => {
            state.commentToRemove = action.payload;
        },
        resetRemoveChronComment: (state) => {
            state.commentToRemove = null;
        },
        removeChronCommentThread: (state, action) => {
            state.commentThreadToRemove = action.payload;
        },
        resetRemoveChronCommentThread: (state) => {
            state.commentThreadToRemove = null;
        }
    }
});

export const { 
    addChronComment, 
    resetAddChronComment,
    updateChronComment,
    resetUpdateChronComment,
    removeChronComment,
    resetRemoveChronComment,
    removeChronCommentThread,
    resetRemoveChronCommentThread
} = chronologicalSlice.actions;

export const selectChronCommentToAdd = (state) => state.commenting.chronological.commentToAdd;
export const selectChronCommentToUpdate = (state) => state.commenting.chronological.commentToUpdate;
export const selectChronCommentToRemove = (state) => state.commenting.chronological.commentToRemove;
export const selectChronCommentThreadToRemove = (state) => state.commenting.chronological.commentThreadToRemove;

export default chronologicalSlice.reducer;