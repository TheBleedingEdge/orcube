import axios from "../config/axios";
import { userRegisterReq, userRegisterSuccess, userRegisterFail } from "../features/userSlice/userRegisterSlice";
import { userLoginReq, userLoginSuccess, userLoginFail } from "../features/userSlice/userLoginSlice";

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
        }
        console.log({ data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(data);
    } catch (error) {
        dispatch(userLoginFail(error))
    }

}