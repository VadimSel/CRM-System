export interface TodoRequest {
	title?: string;
	isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
	id: number;
	title: string;
	created: string;
	isDone: boolean;
}

export interface TodoInfo {
	all: number;
	completed: number;
	inWork: number;
}

export interface MetaResponse<T, N> {
	data: T[];
	info?: N;
	meta: {
		totalAmount: number;
	};
}

export enum TodoFilterEnum {
	all = "all",
	inWork = "inWork",
	completed = "completed",
}

export interface IsLoggedIn {
	isLogged: boolean;
}

export interface SignInTypes {
	login: string;
	password: string;
}

export interface SignInResponse {
	accessToken: string;
	refreshToken: string;
}

export interface SignUpTypes {
	email: string;
	login: string;
	password: string;
	phoneNumber: string;
	username: string;
}

export interface SignUpResponse {
	date: string;
	email: string;
	id: number;
	isAdmin: boolean;
	isBlocked: boolean;
	phoneNumber: string;
	username: string;
}
