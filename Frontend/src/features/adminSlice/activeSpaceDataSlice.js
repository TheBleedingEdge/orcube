import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const activeSpaceDataReducer = createSlice({
    name: 'activeSpaceDataSlice',
    initialState,
    reducers: {
        activeSpaceDataReq: (state, action) => {
            state.loading = true;
        },
        activeSpaceDatarSuccess: (state, action) => {
            state.loading = false;
            state.activeCard = action.payload;
        },
        activeSpaceDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default activeSpaceDataReducer.reducer;
export const { activeSpaceDataReq, activeSpaceDataSuccess, activeSpaceDataFail } =
activeSpaceDataReducer.actions;