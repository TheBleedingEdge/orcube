import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userRegisterReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegisterReq: (state, action) => {
            state.loading = true;
        },
        userRegisterSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userRegisterFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default userRegisterReducer.reducer;
export const { userRegisterReq, userRegisterSuccess, userRegisterFail } =
  userRegisterReducer.actions;