import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commentToAdd: null,
    commentToUpdate: null,
    commentToRemove: null,
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
        }
    }
});

export const { 
    addFieldComment, 
    resetAddFieldComment,
    updateFieldComment,
    resetUpdateFieldComment,
    removeFieldComment,
    resetRemoveFieldComment
} = fieldSlice.actions;

export const selectFieldCommentToAdd = (state) => state.commenting.field.commentToAdd;
export const selectFieldCommentToUpdate = (state) => state.commenting.field.commentToUpdate;
export const selectFieldCommentToRemove = (state) => state.commenting.field.commentToRemove;

export default fieldSlice.reducer;