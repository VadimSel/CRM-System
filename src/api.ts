/* eslint-disable no-useless-catch */
import axios from "axios";
import {
	MetaResponse,
	SignInResponse,
	SignInTypes,
	SignUpTypes,
	Todo,
	TodoFilterEnum,
	TodoInfo,
	TodoRequest,
} from "./types";

export const instance = axios.create({
	baseURL: "https://easydev.club/api/v1",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		"Content-Type": "application/json",
	},
});

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

export async function createTask(task: TodoRequest): Promise<void> {
	try {
		await instance.post("/todos", task);
	} catch (error) {
		throw error;
	}
}

export async function updateTask(id: number, task: TodoRequest): Promise<void> {
	try {
		await instance.put(`/todos/${id}`, task);
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

export async function signUpApi(userData: SignUpTypes): Promise<void> {
	try {
		await instance.post("/auth/signup", userData);
	} catch (error) {
		throw error;
	}
}

export async function signInApi(userData: SignInTypes): Promise<SignInResponse> {
	try {
		const res = await instance.post("/auth/signin", userData);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function refreshToken(refreshToken: string): Promise<SignInResponse> {
	try {
		const res = await instance.post("/auth/refresh", { refreshToken });
		console.log(res);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function resetPassword(newPassword: string): Promise<void> {
	try {
		const res = await instance.put("/user/profile/reset-password", {
			password: newPassword,
		});
		console.log(res);
	} catch (error) {
		console.log(error);
		// throw error
	}
}
