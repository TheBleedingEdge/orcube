import axios from "../config/axios";

import { adminShowUserReq, adminShowUserSuccess, adminShowUserFail, updateUsers } from "../features/adminSlice/adminShowUsersSlice";
import { getToApproveSpaceReq, getToApproveSpaceSuccess, getToApproveSpaceFail, updateSpace } from "../features/adminSlice/getToApproveSpaceSlice";

export const getUsers = () => async (dispatch, getState) => {
  try {
    dispatch(adminShowUserReq());
    const {
      userLogin: { userInfo },
    } = getState();


    console.log("getting users");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/admin/userdocs', config)
    if (data) {
      dispatch(adminShowUserSuccess(data))
    }
  }
  catch (error) {
    dispatch(adminShowUserFail(error))
  }
}

export const changeStatus = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo, "pp");
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/changestatus/${id}`, config)
    console.log("BLOCKED HERE", data);
    dispatch(updateUsers(data));
  } catch (error) {
    console.log(error);
  }
}

export const getToApproveSpace = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(getToApproveSpaceReq())
    const { data } = await axios.get('/api/admin/gettoapprovespace', config)
    dispatch(getToApproveSpaceSuccess(data))
  } catch (error) {
    dispatch(getToApproveSpaceFail())
    console.log(error);
  }
}

export const changeSpaceStatus = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log("here is id", id);
    const { data } = await axios.get(`/api/admin/changespacestatus/${id}`, config)
    console.log("BLOCKED HERE", data);
    dispatch(updateSpace(data));
  } catch (error) {
    console.log(error);
  }
}
