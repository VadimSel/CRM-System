import { createSlice } from "@reduxjs/toolkit";
import { IsLoggedIn } from "../types";

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
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }
});

export const {logged, logout} = loginSlice.actions

export default loginSlice.reducer