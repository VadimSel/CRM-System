import { createSlice } from "@reduxjs/toolkit";
import { accessTokenManager } from "../utils/accessTokenManager";
import { IsLoggedIn } from "../types/authTypes";

const initialState: IsLoggedIn = {
	isLogged: false,
};

export const loginSlice = createSlice({
	name: "login",
	initialState,
  reducers: {
    logged: (state) => {
      state.isLogged = true
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