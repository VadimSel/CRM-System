import { MetaResponse, SignInTypes, SignUpTypes, Todo, TodoInfo } from "./types";

export const BASE_URL = "https://easydev.club/api/v1";

// export async function getUsers() {
// 	try {
// 		const res = await fetch(`${BASE_URL}/todos`, {
// 			method: "GET",
// 		});
// 		console.log(await res.json());
// 	} catch (error) {
// 		window.alert("Ошибка: " + error);
// 	}
// }

export async function signIn(login: string, password: string): Promise<boolean> {
	try {
		const res = await fetch(`${BASE_URL}/auth/signin`, {
			method: "POST",
			body: JSON.stringify({
				login,
				password,
			}),
		});

		if (!res.ok) {
			if (res.status === 401) {
				window.alert("Не верные логин или пароль");
			}
			return false;
		} else {
			return true;
		}
		// const data = await res.json() as SignInTypes
	} catch (error) {
		window.alert("Ошибка: " + error);
		return false;
	}
}

export async function signUp(
	email: string,
	login: string,
	password: string,
	phoneNumber: string,
	username: string
): Promise<boolean> {
	try {
		const res = await fetch(`${BASE_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/json",
			},
			body: JSON.stringify({
				email,
				login,
				password,
				phoneNumber: `+${phoneNumber}`,
				username,
			}),
		});

		if (!res.ok) {
			const err = res;
			if (err.status === 409) {
				window.alert("Пользователь уже существует");
			}
			return false;
		} else {
			// const data = (await res.json()) as SignUpTypes;
			return true;
		}
	} catch (error) {
		window.alert("Ошибка: " + error);
		return false;
	}
}

// export async function getProfile(accessToken?: string) {
// 	try {
// 		const res = await fetch(`${BASE_URL}/user/profile`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${accessToken}`,
// 			},
// 		});
// 		console.log(await res.json());
// 	} catch (error) {
// 		window.alert("Ошибка: " + error);
// 	}
// }

export async function getTasks (): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
	try {
		const res = await fetch(`${BASE_URL}/todos`, {
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

export async function createTask (isDone: boolean, title: string) {
	try {
		const res = await fetch(`${BASE_URL}/todos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/type"
			},
			body: JSON.stringify({
				isDone,
				title
			})
		})

		if (!res.ok) {
			const errorStatus = res.status
			const errorMessage = res.statusText
			window.alert("Ошибка " + errorStatus + ", " + errorMessage)
		}
	} catch (error) {
		window.alert("Ошибка при создании таски: " + error)
	}
}