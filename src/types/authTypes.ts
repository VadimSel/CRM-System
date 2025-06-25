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

export interface ProfileType {
	date: string;
	email: string;
	id: number;
	isAdmin: boolean;
	isBlocked: boolean;
	phoneNumber: string;
	username: string;
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