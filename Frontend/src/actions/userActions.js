import axios from "../config/axios";
import { userRegisterReq, userRegisterSuccess, userRegisterFail } from "../features/userSlice/userRegisterSlice";
import { userLoginReq, userLoginSuccess, userLoginFail } from "../features/userSlice/userLoginSlice";
import { getSpaceReq, getSpaceSuccess, getSpaceFail } from "../features/userSlice/getSpaceSlice";

export const register = (name, email, password, mobileno) => async (dispatch) => {
    try {
        dispatch(userRegisterReq());
        const mobile = mobileno.current.value
        const { data } = await axios.post('/api/user/register', {
            name,
            email,
            password,
            mobile
        })
        if (data) {
            dispatch(userRegisterSuccess(data))
            dispatch(userLoginSuccess(data))
            localStorage.setItem("userInfo", JSON.stringify(data));
        }
    }
    catch (error) {
        dispatch(userRegisterFail(error))
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoginReq());
        console.log("login user");
        const { data } = await axios.post('/api/user/login', {
            email,
            password
        })
        
        if (data) {
            dispatch(userLoginSuccess(data))
            console.log({ data });
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log(data);
        }
    } catch (error) {
        const errorIs =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
    }
}


export const getSpaces = () => async (dispatch) => {
    try {
        dispatch(getSpaceReq());
        const { data } = await axios.get('/api/user/getspaces')
        console.log("spaces are", data);
        dispatch(getSpaceSuccess(data));
    } catch (error) {
        getSpaceFail();
        console.log(error);
    }
}