/* eslint-disable no-useless-catch */
import { MetaResponse, Todo, TodoInfo, TodoRequest, TodoStatusTypes } from "./types";

export const BASE_URL = "https://easydev.club/api/v1";

export async function getTasks (tasksStatus: TodoStatusTypes): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
	try {
		const res = await fetch(`${BASE_URL}/todos?filter=${tasksStatus}`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "GET"
		})
		const data = await res.json() as MetaResponse<Todo, TodoInfo>
		return data
	} catch (error) {
		window.alert("Ошибка: " + error)
	}
}

export async function createTask(task: TodoRequest) {
    try {
        const res = await fetch(`${BASE_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if (!res.ok) {
            throw new Error(`${res.status}, ${res.statusText}`);
        }
    } catch (error) {
        throw error;
    }
}

export async function updateTask (id: number, task: TodoRequest) {
	try {
		const res = await fetch(`${BASE_URL}/todos/${id}`, {
			headers: {
				"Content-type": "application/json"
			},
			method: "PUT",
			body: JSON.stringify(task)
		})

		if (!res.ok) {
			window.alert("Ошибка " + res.status + ", " + res.statusText)
		}
	} catch (error) {
		window.alert(error)
	}
}

export async function deleteTask (id: number) {
	try {
		const res = await fetch(`${BASE_URL}/todos/${id}`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "DELETE"
		})

		if (!res.ok) {
			window.alert("Ошибка " + res.status + ": " + res.statusText)
		}
		
	} catch (error) {
		window.alert("Ошибка: " + error)
	}
}