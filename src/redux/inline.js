import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
};

const inlineSlice = createSlice({
    name: 'inline',
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
} = inlineSlice.actions;

export const selectCommentToAdd = (state) => state.commenting.inline.commentToAdd;
export const selectCommentToUpdate = (state) => state.commenting.inline.commentToUpdate;
export const selectCommentToRemove = (state) => state.commenting.inline.commentToRemove;

export default inlineSlice.reducer;