import axios from "axios";
import { URL } from "../secure/Firebase/API_URL";

import { userRegisterReq, userRegisterSuccess, userRegisterFail } from "../components/UserComponent/Register/registerSlice";

export const register = (name, email, password, mobile) => async (dispatch) => {
    dispatch(userRegisterReq());
}