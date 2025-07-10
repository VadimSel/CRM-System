export interface GetUsers {
	data: User[];
	meta: {
		sortBy: string;
		sortOrder: "asc" | "desc";
		totalAmount: number;
	};
}

// Интерфейс запроса для фильтрации и сортировки пользователей

export interface UserFilters {
	search?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	isBlocked?: boolean;
	limit?: number; // сколько на странице
	offset?: number; // страницу
}

// Интерфейс пользователя
export interface User {
	id: number;
	username: string;
	email: string;
	date: string;
	isBlocked: boolean;
	roles: Roles[];
	phoneNumber: string;
}

export type blockUnlockTypes = "block" | "unblock";

export interface UserRolesRequest {
	roles: Roles[];
}

export enum Roles {
	ADMIN = "ADMIN",
	MODERATOR = "MODERATOR",
	USER = "USER",
}
