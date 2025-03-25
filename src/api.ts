export const BASE_URL = "https://easydev.club/api/v1";

// type answerType = Record<
// 	"email" | "login" | "password" | "phoneNumber" | "username",
// 	string
// >;

// interface answerType {
// 	email: string,
// 	login: string,
// 	password: string,
// 	phoneNumber: string,
// 	username: string
// }

export async function getUsers() {
	try {
		const res = await fetch(`${BASE_URL}/todos`, {
			method: "GET",
		});
		console.log(await res.json());
	} catch (error) {
		console.log("Ошибка при запросе getUsers:", error);
	}
}

export async function signIn(login?: string, password?: string) {
	try {
		const res = await fetch(`${BASE_URL}/auth/signin`, {
			method: "POST",
			body: JSON.stringify({
				login: login,
				password: password,
			}),
		});
		const data = await res.json();
		console.log(data.accessToken);
		return data.accessToken;
	} catch (error) {
		console.log("Ошибка при запросе signIn:", error);
	}
}

export function signUp(
	email: string,
	login: string,
	password: string,
	phoneNumber: string,
	username: string
) {
	try {
		fetch(`${BASE_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "Application/json",
			},
			body: JSON.stringify({ email, login, password, phoneNumber, username }),
		});
	} catch (error) {
		console.log("Ошибка при запросе signUp:", error);
	}
}

export async function getProfileWithToken(accessToken?: string) {
	try {
		const res = await fetch(`${BASE_URL}/user/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(await res.json());
	} catch (error) {
		console.log("Ошибка при запросе getProfileWithToken:", error);
	}
}
