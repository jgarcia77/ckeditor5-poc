import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
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
        }
    }
});

export const { 
    addChronComment, 
    resetAddChronComment,
    updateChronComment,
    resetUpdateChronComment,
    removeChronComment,
    resetRemoveChronComment
} = chronologicalSlice.actions;

export const selectChronCommentToAdd = (state) => state.commenting.chronological.commentToAdd;
export const selectChronCommentToUpdate = (state) => state.commenting.chronological.commentToUpdate;
export const selectChronCommentToRemove = (state) => state.commenting.chronological.commentToRemove;

export default chronologicalSlice.reducer;