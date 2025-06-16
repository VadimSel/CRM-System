/* eslint-disable no-useless-catch */
import { MetaResponse, Task, Todo, TodoFilterEnum, TodoInfo, TodoRequest } from "../types";
import { instance } from "./axiosInstance";

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
