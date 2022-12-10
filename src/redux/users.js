import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../apis/usersAPI';

export const readUsers = createAsyncThunk('users/read', async() => {
    return await getUsers();
});

const initialState = {
    isIdle: true,
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    data: []
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(readUsers.pending, (state) => {
            state.isIdle = false;
            state.isPending = true;
            state.isFulfilled = false;
            state.isRejected = false;
            state.data = [];
        });
        builder.addCase(readUsers.rejected, (state) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = false;
            state.isRejected = true;
            state.data = [];
        });
        builder.addCase(readUsers.fulfilled, (state, action) => {
            state.isIdle = false;
            state.isPending = false;
            state.isFulfilled = true;
            state.isRejected = false;
            state.data = action.payload;
        });
    }
});

export const selectUsers = (state) => state.commenting.users;

export default usersSlice.reducer;