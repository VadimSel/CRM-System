import { GetUsers, User } from "../types/adminTypes";
import { instance } from "./axiosInstance";

export async function getUsers(): Promise<User[]> {
	const res = await instance.get<GetUsers>("/admin/users");
	return res.data.data;
}

export async function getUserProfile(id: number): Promise<User> {
	const res = await instance.get(`/admin/users/${id}`);
	return res.data;
}

export async function updateUserInfo(
	id: number,
	email: string,
	phoneNumber: string,
	username: string
) {
	const res = await instance.put(`/admin/users/${id}`, { email, phoneNumber, username });
}
