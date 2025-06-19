import axios from "axios";
import { logout } from "../store/loginSlice";
import { store } from "../store/store";
import { accessTokenManager } from "../utils/accessTokenManager";
import { refreshToken } from "./authApi";
import { notification } from "antd";

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

instance.interceptors.request.use(async (config) => {
	const accessToken = accessTokenManager.getToken();
	const refresh = localStorage.getItem("refreshToken");
	try {
		config.headers.Authorization = `Bearer ${accessToken}`;
	} catch (error) {
		notification.error({
			message: String(error),
			placement: "top",
		});
	}
	if (!refresh) {
		store.dispatch(logout());
	}
	return config;
});

instance.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error.response.data.trim() === "Invalid token") {
			const res = await refreshToken(String(accessTokenManager.getToken()));
			accessTokenManager.setToken(res.accessToken);
			localStorage.setItem("refreshToken", res.refreshToken);
			error.config.headers.Authorization = `Bearer ${res.accessToken}`;
			return instance(error.config);
		} else {
			throw error
		}
	}
);
