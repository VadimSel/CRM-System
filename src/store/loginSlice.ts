import { createSlice } from "@reduxjs/toolkit";
import { isLoggedIn } from "../types";

const initialState: isLoggedIn = {
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
    }
  }
});

export const {logged, logout} = loginSlice.actions

export default loginSlice.reducer