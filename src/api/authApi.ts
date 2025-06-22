 

import {
	ProfileType,
	SignInResponse,
	SignInTypes,
	SignUpTypes,
} from "../types/authTypes";
import { instance, tokensInstance } from "./axiosInstance";

export async function signUpApi(userData: SignUpTypes): Promise<ProfileType> {
	const res = await instance.post("/auth/signup", userData);
	return res.data;
}

export async function signInApi(userData: SignInTypes): Promise<SignInResponse> {
	const res = await tokensInstance.post("/auth/signin", userData);
	return res.data;
}

export async function refreshToken(refreshToken: string): Promise<SignInResponse> {
	const res = await tokensInstance.post("/auth/refresh", { refreshToken });
	return res.data;
}

export async function getProfile(): Promise<ProfileType> {
	const res = await instance.get("/user/profile");
	return res.data;
}

export async function logoutApi(): Promise<void> {
	await instance.post("/user/logout");
}
