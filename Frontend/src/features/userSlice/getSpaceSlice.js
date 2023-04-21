import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const getSpaceReducer = createSlice({
    name: 'getSpace',
    initialState,
    reducers: {
        getSpaceReq: (state, action) => {
            state.loading = true;
        },
        getSpaceSuccess: (state, action) => {
            state.loading = false;
            state.spaceData = action.payload;
        },
        getSpaceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { getSpaceReq, getSpaceSuccess, getSpaceFail } =
    getSpaceReducer.actions;
export default getSpaceReducer.reducer;