import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userRegisterSlice from "../features/userSlice/userRegisterSlice";
import userLoginSlice from "../features/userSlice/userLoginSlice";
import adminShowUsersSlice from "../features/adminSlice/adminShowUsersSlice";
import getToApproveSpaceSlice from "../features/adminSlice/getToApproveSpaceSlice";
import getSpaceSlice from "../features/userSlice/getSpaceSlice";
import hostUploadSlice from "../features/hostSlice/hostUploadSlice";

const store = configureStore({
  reducer: {
    userRegister: userRegisterSlice,
    userLogin: userLoginSlice,
    adminShowUsers: adminShowUsersSlice,
    getToApproveSpace: getToApproveSpaceSlice,
    getSpaces: getSpaceSlice,
    hostUpload: hostUploadSlice,
  },
})

export default store;