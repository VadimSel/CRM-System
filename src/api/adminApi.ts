import {
	blockUnlockTypes,
	GetUsers,
	User,
	UserFilters,
	userNewDataTypes,
	UserRolesRequest,
} from "../types/adminTypes";
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
	userNewData: userNewDataTypes
): Promise<User> {
	return await instance.put(`/admin/users/${id}`, userNewData);
}

export async function removeUser(id: number): Promise<void> {
	await instance.delete(`/admin/users/${id}`);
}

export async function blockUnblockUserApi(
	id: number,
	request: blockUnlockTypes
): Promise<User> {
	return await instance.post(`/admin/users/${id}/${request}`);
}

export async function updatesUserRights(
	id: number,
	userRoles: UserRolesRequest
): Promise<User> {
	return await instance.post(`/admin/users/${id}/rights`, userRoles);
}
