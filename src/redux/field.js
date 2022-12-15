import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
    commentThreadToRemove: null
};

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        addFieldComment: (state, action) => {
            state.commentToAdd = action.payload;
        },
        resetAddFieldComment: (state) => {
            state.commentToAdd = null;
        },
        updateFieldComment: (state, action) => {
            state.commentToUpdate = action.payload;
        },
        resetUpdateFieldComment: (state) => {
            state.commentToUpdate = null;
        },
        removeFieldComment: (state, action) => {
            state.commentToRemove = action.payload;
        },
        resetRemoveFieldComment: (state) => {
            state.commentToRemove = null;
        },
        removeFieldCommentThread: (state, action) => {
            state.commentThreadToRemove = action.payload;
        },
        resetRemoveFieldCommentThread: (state) => {
            state.commentThreadToRemove = null;
        }
    }
});

export const { 
    addFieldComment, 
    resetAddFieldComment,
    updateFieldComment,
    resetUpdateFieldComment,
    removeFieldComment,
    resetRemoveFieldComment,
    removeFieldCommentThread,
    resetRemoveFieldCommentThread
} = fieldSlice.actions;

export const selectFieldCommentToAdd = (state) => state.commenting.field.commentToAdd;
export const selectFieldCommentToUpdate = (state) => state.commenting.field.commentToUpdate;
export const selectFieldCommentToRemove = (state) => state.commenting.field.commentToRemove;
export const selectFieldCommentThreadToRemove = (state) => state.commenting.field.commentThreadToRemove;

export default fieldSlice.reducer;