import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const userLoginReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoginReq: (state, action) => {
            state.loading = true;
        },
        userLoginSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        userLoginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default userLoginReducer.reducer;
export const { userLoginReq, userLoginSuccess, userLoginFail } =
  userLoginReducer.actions;