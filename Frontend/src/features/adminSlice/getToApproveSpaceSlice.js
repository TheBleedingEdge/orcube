import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const getToApproveSpaceReducer = createSlice({
    name: 'getToApproveSpaceSlice',
    initialState,
    reducers: {
        getToApproveSpaceReq: (state, action) => {
            state.loading = true;
        },
        getToApproveSpaceSuccess: (state, action) => {
            state.loading = false;
            state.toApprovespaceDocs = action.payload;
        },
        getToApproveSpaceFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateSpace: (state, action) => {
            const updatedSpace = state.toApprovespaceDocs.map(space => {
                if(space._id === action.payload._id)  return action.payload;
                return space;
            })
            state.toApprovespaceDocs = updatedSpace;
        }
    }
})

export default getToApproveSpaceReducer.reducer;
export const { getToApproveSpaceReq, getToApproveSpaceSuccess, getToApproveSpaceFail, updateSpace } =
getToApproveSpaceReducer.actions;