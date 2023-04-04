import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const hostUploadReducer = createSlice({
    name: ' hostUpload',
    initialState,
    reducers: {
        hostUploadReq: (state, action) => {
            state.loading = true;
        },
        hostUploadSuccess: (state, action) => {
            state.loading = false;
            state.hostcoord = action.payload;
        },
        hostUploadFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { hostUploadReq, hostUploadSuccess, hostUploadFail } =
hostUploadReducer.actions;
export default hostUploadReducer.reducer;