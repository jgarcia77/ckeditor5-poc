import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
    // createCommentThread: {
    //     isIdle: true,
    //     isPending: false,
    //     isFulfilled: false,
    //     isRejected: false,
    //     data: {}
    // }
};

const chronologicalSlice = createSlice({
    name: 'chronological',
    initialState,
    reducers: {
        addCommentAction: (state, action) => {
            state.commentToAdd = action.payload;
        },
        resetAddCommentAction: (state) => {
            state.commentToAdd = null;
        },
        updateCommentAction: (state, action) => {
            state.commentToUpdate = action.payload;
        },
        resetUpdateCommentAction: (state) => {
            state.commentToUpdate = null;
        },
        removeCommentAction: (state, action) => {
            state.commentToRemove = action.payload;
        },
        resetRemoveCommentAction: (state) => {
            state.commentToRemove = null;
        }
    }
});

export const { 
    addCommentAction, 
    resetAddCommentAction,
    updateCommentAction,
    resetUpdateCommentAction,
    removeCommentAction,
    resetRemoveCommentAction
} = chronologicalSlice.actions;

export const selectCommentToAdd = (state) => state.commenting.chronological.commentToAdd;
export const selectCommentToUpdate = (state) => state.commenting.chronological.commentToUpdate;
export const selectCommentToRemove = (state) => state.commenting.chronological.commentToRemove;

export default chronologicalSlice.reducer;