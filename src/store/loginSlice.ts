import { createSlice } from "@reduxjs/toolkit";
import { accessTokenManager } from "../utils/accessTokenManager";
import { IsLoggedIn } from "../types/authTypes";

const initialState: IsLoggedIn = {
	isLogged: false,
  isAdmin: false
};

export const loginSlice = createSlice({
	name: "login",
	initialState,
  reducers: {
    logged: (state, action) => {
      state.isLogged = true
      state.isAdmin = action.payload.isAdmin
    },
    logout: (state) => {
      state.isLogged = false
      accessTokenManager.clearToken()
      localStorage.removeItem("refreshToken")
    }
  }
});

export const {logged, logout} = loginSlice.actions

export default loginSlice.reducer