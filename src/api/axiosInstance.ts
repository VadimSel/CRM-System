import axios from "axios";
import { logout } from "../store/loginSlice";
import { store } from "../store/store";
import { accessTokenManager } from "../utils/accessTokenManager";
import { refreshToken } from "./authApi";

const baseURL = "https://easydev.club/api/v1";

export const instance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const tokensInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use((config) => {
	const accessToken = accessTokenManager.getToken();
	const refresh = localStorage.getItem("refreshToken");
	config.headers.Authorization = `Bearer ${accessToken}`;
	if (!refresh) {
		store.dispatch(logout());
	}
	return config;
});

instance.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.data.trim() === "Invalid token") {
			try {
				const res = await refreshToken(String(accessTokenManager.getToken()));
				accessTokenManager.setToken(res.accessToken);
				localStorage.setItem("refreshToken", res.refreshToken);
				error.config.headers.Authorization = `Bearer ${res.accessToken}`;
				return instance(error.config);
			} catch {
				store.dispatch(logout());
			}
		} else {
			throw error;
		}
	}
);
