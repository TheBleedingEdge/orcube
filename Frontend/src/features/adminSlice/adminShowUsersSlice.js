import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const adminShowUserReducer = createSlice({
    name: 'adminShowUsersSlice',
    initialState,
    reducers: {
        adminShowUserReq: (state, action) => {
            state.loading = true;
        },
        adminShowUserSuccess: (state, action) => {
            state.loading = false;
            state.userData = action.payload;
        },
        adminShowUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUsers: (state, action) => {
            const updatedUsers = state.userData.map(user => {
                if(user._id === action.payload._id)  return action.payload;
                return user;
            })
            state.userData = updatedUsers;
        }
    }
})

export default adminShowUserReducer.reducer;
export const { adminShowUserReq, adminShowUserSuccess, adminShowUserFail, updateUsers } =
adminShowUserReducer.actions;