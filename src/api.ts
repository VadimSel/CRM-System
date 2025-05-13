/* eslint-disable no-useless-catch */
import axios from "axios";
import { MetaResponse, Todo, TodoInfo, TodoRequest, TodoStatusTypes } from "./types";

export const instance = axios.create({
	baseURL: "https://easydev.club/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export async function getTasks(
	tasksStatus: TodoStatusTypes
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

export async function createTask(task: TodoRequest) {
	try {
		await instance.post("/todos", task);
	} catch (error) {
		throw error;
	}
}

export async function updateTask(id: number, task: TodoRequest) {
	try {
		await instance.put(`/todos/${id}`, task);
	} catch (error) {
		throw error;
	}
}

export async function deleteTask(id: number) {
	try {
		await instance.delete(`/todos/${id}`);
	} catch (error) {
		throw error;
	}
}
