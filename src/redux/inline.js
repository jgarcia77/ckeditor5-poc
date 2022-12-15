import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
    commentThreadToRemove: null,
};

const inlineSlice = createSlice({
    name: 'inline',
    initialState,
    reducers: {
        addInlineComment: (state, action) => {
            state.commentToAdd = action.payload;
        },
        resetAddInlineComment: (state) => {
            state.commentToAdd = null;
        },
        updateInlineComment: (state, action) => {
            state.commentToUpdate = action.payload;
        },
        resetUpdateInlineComment: (state) => {
            state.commentToUpdate = null;
        },
        removeInlineComment: (state, action) => {
            state.commentToRemove = action.payload;
        },
        resetRemoveInlineComment: (state) => {
            state.commentToRemove = null;
        },
        removeInlineCommentThread: (state, action) => {
            state.commentThreadToRemove = action.payload;
        },
        resetRemoveInlineCommentThread: (state) => {
            state.commentThreadToRemove = null;
        }
    }
});

export const { 
    addInlineComment, 
    resetAddInlineComment,
    updateInlineComment,
    resetUpdateInlineComment,
    removeInlineComment,
    resetRemoveInlineComment,
    removeInlineCommentThread,
    resetRemoveInlineCommentThread
} = inlineSlice.actions;

export const selectInlineCommentToAdd = (state) => state.commenting.inline.commentToAdd;
export const selectInlineCommentToUpdate = (state) => state.commenting.inline.commentToUpdate;
export const selectInlineCommentToRemove = (state) => state.commenting.inline.commentToRemove;
export const selectInlineCommentThreadToRemove = (state) => state.commenting.inline.commentThreadToRemove;

export default inlineSlice.reducer;