/* eslint-disable no-useless-catch */
import axios from "axios";
import { logout } from "./store/loginSlice";
import { store } from "./store/store";
import {
	MetaResponse,
	ProfileType,
	SignInResponse,
	SignInTypes,
	SignUpTypes,
	Task,
	Todo,
	TodoFilterEnum,
	TodoInfo,
	TodoRequest,
} from "./types";
import { accessTokenManager } from "./utils/accessTokenManager";
import { ApiErrorHandler } from "./utils/ApiErrorHandler";

const baseURL = "https://easydev.club/api/v1";

const instance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

const tokensInstance = axios.create({
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
		ApiErrorHandler(error);
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
			accessTokenManager.setToken(res.accessToken)
			localStorage.setItem("refreshToken", res.refreshToken);
			error.config.headers.Authorization = `Bearer ${res.accessToken}`;
			return instance(error.config);
		} else {
			ApiErrorHandler(error);
		}
	}
);

export async function getTasks(
	tasksStatus: TodoFilterEnum
): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
	try {
		const res = await instance.get("/todos", {
			params: { filter: tasksStatus },
		});
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function createTask(task: TodoRequest): Promise<Task> {
	try {
		const res = await instance.post("/todos", task);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function updateTask(id: number, task: TodoRequest): Promise<Task> {
	try {
		const res = await instance.put(`/todos/${id}`, task);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function deleteTask(id: number): Promise<void> {
	try {
		await instance.delete(`/todos/${id}`);
	} catch (error) {
		throw error;
	}
}

export async function signUpApi(userData: SignUpTypes): Promise<ProfileType> {
	try {
		const res = await instance.post("/auth/signup", userData);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function signInApi(userData: SignInTypes): Promise<SignInResponse> {
	try {
		const res = await tokensInstance.post("/auth/signin", userData);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function refreshToken(refreshToken: string): Promise<SignInResponse> {
	try {
		const res = await tokensInstance.post("/auth/refresh", { refreshToken });
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function resetPassword(newPassword: string): Promise<void> {
	try {
		await instance.put("/user/profile/reset-password", {
			password: newPassword,
		});
	} catch (error) {
		throw error;
	}
}

export async function getProfile(): Promise<ProfileType> {
	try {
		const res = await instance.get("/user/profile");
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function logoutApi(): Promise<void> {
	try {
		await instance.post("/user/logout");
	} catch (error) {
		throw error;
	}
}
