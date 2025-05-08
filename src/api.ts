/* eslint-disable no-useless-catch */
import axios from "axios";
import { MetaResponse, Todo, TodoInfo, TodoRequest, TodoStatusTypes } from "./types";

const BASE_URL = "https://easydev.club/api/v1";

export async function getTasks (tasksStatus: TodoStatusTypes): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
	try {
		const res = await axios.get(`${BASE_URL}/todos`, {
			params: {filter: tasksStatus},
			headers: {
				"Content-Type": "application/json"
			}
		})

		return res.data
	} catch (error) {
		throw error
	}
}

export async function createTask (task: TodoRequest) {
	try {
		await axios.post(`${BASE_URL}/todos`, task, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	} catch (error) {
		throw error
	}
}

export async function updateTask (id: number, task: TodoRequest) {
	try {
		await axios.put(`${BASE_URL}/todos/${id}`, task, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	} catch (error) {
		throw error
	}
}

export async function deleteTask (id: number) {
	try {
		await axios.delete(`${BASE_URL}/todos/${id}`, {
			headers: {
				"Content-Type": "application/json"
			}
		})
	} catch (error) {
		throw error
	}
}