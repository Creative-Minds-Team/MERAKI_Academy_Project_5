import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    isLoggedIn: false || localStorage.getItem("isLoggedIn"),
    userInfo: null || JSON.parse(localStorage.getItem("userInfo")) || {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);

      console.log("done token and  _userId");
    },
    setLoginGoogel: (state, action) => {
      state.token = action.payload.credential;
      state.userId = action.payload.clientId;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", state.isLoggedIn);
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", state.userId);

      console.log("done token and  _userId");
    },

    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserInfo: (state, action) => {
      state.userInfo = jwtDecode(action.payload.token);
      let userInfo = JSON.stringify(state.userInfo);
      localStorage.setItem("userInfo", userInfo);
      console.log("userInfo:", userInfo);
    },
    setUserInfoGoogle: (state, action) => {
      state.userInfo = jwtDecode(action.payload.credential);
      console.log("state.userInfo:", state.userInfo);
    },
  },
});
export const {
  setLogin,
  setLogout,
  setUserInfo,
  setLoginGoogel,
  setUserInfoGoogle,
} = authSlice.actions;

export default authSlice.reducer;
