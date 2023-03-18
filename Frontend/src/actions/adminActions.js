import axios from "../config/axios";

import { adminShowUserReq, adminShowUserSuccess, adminShowUserFail, updateUsers } from "../features/adminSlice/adminShowUsersSlice";

export const getUsers = () => async (dispatch) => {
    try {
        dispatch(adminShowUserReq());
        const { data } = await axios.get('/api/admin/userdocs')
        if (data) {
            dispatch(adminShowUserSuccess(data))
        }
    }
    catch (error) {
        dispatch(adminShowUserFail(error))
    }
}

export const changeStatus = (id) => async (dispatch) => {
    try {
        const {data} = await  axios.post(`/api/admin/changestatus/${id}`)
        console.log("BLOCKED HERE",data);
        dispatch(updateUsers(data));
    } catch (error) {
        console.log(error);
    }
}