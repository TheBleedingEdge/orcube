import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import userRegisterSlice from "../features/userSlice/userRegisterSlice";
import userLoginSlice from "../features/userSlice/userLoginSlice";
import adminShowUsersSlice from "../features/adminSlice/adminShowUsersSlice";

const store = configureStore({
  reducer: {
    //   userLogin: userLoginReducer,
    userRegister: userRegisterSlice,
    userLogin: userLoginSlice,
    adminShowUsers: adminShowUsersSlice
  },
})

export default store;