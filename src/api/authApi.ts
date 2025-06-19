/* eslint-disable no-useless-catch */

import { ProfileType, SignInResponse, SignInTypes, SignUpTypes } from "../types";
import { instance, tokensInstance } from "./axiosInstance";

export async function signUpApi(userData: SignUpTypes): Promise<ProfileType> {
	try {
		const res = await instance.post("/auth/signup", userData);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function signInApi(userData: SignInTypes): Promise<SignInResponse> {
	try {
		const res = await tokensInstance.post("/auth/signin", userData);
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function refreshToken(refreshToken: string): Promise<SignInResponse> {
	try {
		const res = await tokensInstance.post("/auth/refresh", { refreshToken });
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function getProfile(): Promise<ProfileType> {
	try {
		const res = await instance.get("/user/profile");
		return res.data;
	} catch (error) {
		throw error;
	}
}

export async function logoutApi(): Promise<void> {
	try {
		await instance.post("/user/logout");
	} catch (error) {
		throw error;
	}
}