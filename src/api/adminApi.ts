import { GetUsers, User, UserFilters } from "../types/adminTypes";
import { instance } from "./axiosInstance";

export async function getUsers({
	search,
	sortBy,
	sortOrder,
	isBlocked,
	limit,
	offset,
}: UserFilters): Promise<User[]> {
	const res = await instance.get<GetUsers>("/admin/users", {
		params: { search, sortBy, sortOrder, isBlocked, limit, offset },
	});
	return res.data.data;
}

export async function getUserProfile(id: number): Promise<User> {
	const res = await instance.get(`/admin/users/${id}`);
	return res.data;
}

export async function updateUserInfo(
	id: number,
	email?: string,
	phoneNumber?: string,
	username?: string
): Promise<User> {
	return await instance.put(`/admin/users/${id}`, { email, phoneNumber, username });
}

export async function removeUser(id: number): Promise<void> {
	await instance.delete(`/admin/users/${id}`);
}
