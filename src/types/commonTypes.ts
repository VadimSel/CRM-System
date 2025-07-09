export type PersonalOrPublic = "personal" | "public";

export type RequestTypes =
	| "signUp"
	| "signIn"
	| "refreshToken"
	| "logout"
	| "getTasks"
	| "createTask"
	| "updateTask"
	| "deleteTask"
	| "adminGetUsers"
	| "adminGetUserProfile"
	| "adminUpdateUserProfile"
	| "adminDeleteUser"
	| "blockUnblockUser"
	| "updatesUserRights";

	export enum userFilters {
		ALLUSERS = "Все пользователи",
		ONLYBLOCKEDUSERS = "Только заблокированные пользователи",
		ONLYACTIVEUSERS = "Только активные пользователи"
	}