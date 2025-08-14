import { MoreOutlined } from "@ant-design/icons";
import {
	Button,
	Dropdown,
	Form,
	Input,
	Modal,
	notification,
	Select,
	Table,
	TableProps,
} from "antd";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import {
	blockUnblockUserApi,
	getUsers,
	removeUser,
	updatesUserRights,
} from "../api/adminApi";
import { RootState } from "../store/store";
import { blockUnlockTypes, Roles, User, UserFilters } from "../types/adminTypes";
import { updateUserRigthsTypes, userFilters } from "../types/commonTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import styles from "./Users.module.scss";

export const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const isUserAdmin = useSelector((state: RootState) => state.isLoggedIn.isAdmin);
	const { confirm } = Modal;
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchInputValue, setSearchInputValue] = useState<string>(
		searchParams.get("search") ?? ""
	);
	const debounceTimer = useRef<number | undefined>(undefined);

	const getFilters = () => {
		const searchValue = searchParams.get("search") ?? undefined;
		const isBlocked = searchParams.get("isBlocked");
		const isBlockedValue =
			isBlocked === "true" ? true : isBlocked === "false" ? false : undefined;
		const sortBy = searchParams.get("sortBy") ?? undefined;
		const sortOrder =
			searchParams.get("sortOrder") === "asc"
				? "asc"
				: searchParams.get("sortOrder") === "desc"
				? "desc"
				: undefined;
		const filters: UserFilters = {
			search: searchValue,
			isBlocked: isBlockedValue,
			sortBy,
			sortOrder,
		};
		return filters;
	};

	const { ALLUSERS, ONLYBLOCKEDUSERS, ONLYACTIVEUSERS } = userFilters;
	const showUpdateUserRightsConfirmation = (
		id: number,
		selectedRole: Roles,
		roles: Roles[],
		action: updateUserRigthsTypes
	) => {
		confirm({
			title: `${action === "add" ? "Дать" : "Забрать"} роль ${selectedRole}?`,
			okText: "Да",
			cancelText: "Отмена",
			centered: true,
			async onOk() {
				await setUserRights(id, selectedRole, roles, action);
			},
		});
	};

	const showDeleteUserConfirmation = (id: number) => {
		confirm({
			title: "Удалить пользователя?",
			okText: "Да",
			cancelText: "Отмена",
			centered: true,
			async onOk() {
				await deleteUser(id);
			},
		});
	};

	const deleteUser = async (id: number) => {
		try {
			await removeUser(id);
			notification.success({
				message: "Пользователь удалён",
				placement: "top",
			});
			getAllUsers(getFilters());
		} catch (error) {
			ApiErrorHandler("adminDeleteUser", error);
		}
	};

	const blockUnblockUser = async (id: number, request: blockUnlockTypes) => {
		confirm({
			title: `${request === "block" ? "Заблокировать" : "Разблокировать"} пользователя?`,
			okText: "Да",
			cancelText: "Отмена",
			centered: true,
			onOk: async () => {
				try {
					await blockUnblockUserApi(id, request);
					notification.success({
						message: `Пользователь ${
							request === "block" ? "заблокирован" : "разблокирован"
						}`,
						placement: "top",
					});
					getAllUsers(getFilters());
				} catch (error) {
					ApiErrorHandler("blockUnblockUser", error);
				}
			},
		});
	};

	const setUserRights = async (
		id: number,
		selectedRole: Roles,
		roles: Roles[],
		action: updateUserRigthsTypes
	) => {
		const userRights = [...roles, selectedRole];
		if (action === "add") {
			try {
				await updatesUserRights(id, { roles: userRights });
				notification.success({
					message: `Роль ${selectedRole} добавлена`,
					placement: "top",
				});
				getAllUsers(getFilters());
			} catch (error) {
				ApiErrorHandler("updatesUserRights", error);
			}
		} else {
			try {
				const removeRole = userRights.filter((el) => {
					return el !== selectedRole;
				});
				await updatesUserRights(id, { roles: removeRole });
				notification.success({
					message: `Роль ${selectedRole} убрана`,
					placement: "top",
				});
				getAllUsers(getFilters());
			} catch (error) {
				ApiErrorHandler("updatesUserRights", error);
			}
		}
	};

	const onChange: TableProps<User>["onChange"] = async (_pagination, _filter, sorter) => {
		const sort = Array.isArray(sorter) ? sorter[0] : sorter;
		const ord = sort?.order;
		const sortBy = sort?.field;
		const sortOrder = ord === "ascend" ? "asc" : "desc";
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (sortBy) {
				newParams.set("sortBy", String(sortBy));
			} else {
				newParams.delete("sortBy");
			}
			if (sortOrder) {
				newParams.set("sortOrder", sortOrder);
			} else {
				newParams.delete("sortOrder");
			}
			return newParams;
		});
	};

	const columns: TableProps<User>["columns"] = [
		{
			title: "Имя",
			dataIndex: "username",
			key: "username",
			fixed: "left",
			sorter: true,
		},
		{ title: "Email", dataIndex: "email", key: "email", width: 200, sorter: true },
		{
			title: "Дата регистрации",
			dataIndex: "date",
			key: "date",
			render: (date: string) => format(new Date(date), "dd/mm/yyyy"),
		},
		{
			title: "Статус блокировки",
			dataIndex: "isBlocked",
			key: "isBlocked",
			render: (isBlocked: boolean) => (isBlocked ? "Заблокирован" : "Не заблокирован"),
		},
		{
			title: "Роль",
			dataIndex: "roles",
			key: "roles",
			render: (roles: Roles[]) => roles.join(", "),
		},
		{ title: "Номер телефона", dataIndex: "phoneNumber", key: "phoneNumber", width: 150 },
		{
			dataIndex: "id",
			key: "actions",
			fixed: "right",
			render: (id: number, record: User) => {
				const items = [
					{
						key: "profile",
						label: "Профиль",
						onClick: () => navigate(`/userProfile/${id}`),
					},
					{
						key: "delete",
						label: "Удалить",
						danger: true,
						onClick: () => showDeleteUserConfirmation(id),
					},
					{
						key: "blockUnblock",
						label: record.isBlocked ? "Разблокировать" : "Заблокировать",
						onClick: () => blockUnblockUser(id, record.isBlocked ? "unblock" : "block"),
					},
					{
						key: "setRole",
						label: "Роль",
						children: [
							{
								key: "giveRole",
								label: "Дать роль",
								onClick: () => changeUserRole(id, record.roles, "add"),
							},
							{
								key: "takeRole",
								label: "Забрать роль",
								onClick: () => changeUserRole(id, record.roles, "remove"),
							},
						],
					},
				];

				return (
					<Dropdown trigger={["click"]} menu={{ items }}>
						<Button icon={<MoreOutlined />} />
					</Dropdown>
				);
			},
		},
	];

	const getAllUsers = async ({
		search,
		sortBy,
		sortOrder,
		isBlocked,
		limit,
		offset,
	}: UserFilters) => {
		try {
			const res = await getUsers({ search, sortBy, sortOrder, isBlocked, limit, offset });
			setUsers(res);
		} catch (error) {
			ApiErrorHandler("adminGetUsers", error);
		}
	};

	const changeUserFilter = async (value: string) => {
		const filterValue =
			value === ONLYBLOCKEDUSERS ? true : value === ONLYACTIVEUSERS ? false : undefined;
		setSearchParams((prev) => {
			const newParams = new URLSearchParams(prev);
			if (filterValue?.valueOf) {
				newParams.set("isBlocked", String(filterValue));
			} else {
				newParams.delete("isBlocked");
			}
			return newParams;
		});
	};

	const changeUserRole = (id: number, roles: Roles[], action: updateUserRigthsTypes) => {
		let selectedRole: Roles;
		confirm({
			title: "Выберите роль",
			centered: true,
			content: (
				<Select
					className={styles.changeUserRoleSelect}
					onChange={(value) => (selectedRole = value)}
					options={[
						{
							value: Roles.ADMIN,
							label: Roles.ADMIN,
							disabled:
								action === "add"
									? roles.includes(Roles.ADMIN)
									: !roles.includes(Roles.ADMIN),
						},
						{
							value: Roles.MODERATOR,
							label: Roles.MODERATOR,
							disabled:
								action === "add"
									? roles.includes(Roles.MODERATOR)
									: !roles.includes(Roles.MODERATOR),
						},
						{
							value: Roles.USER,
							label: Roles.USER,
							disabled:
								action === "add"
									? roles.includes(Roles.USER)
									: !roles.includes(Roles.USER),
						},
					]}
				/>
			),
			async onOk() {
				if (!selectedRole) {
					notification.error({
						message: "Выберите роль",
						placement: "top",
					});
					return Promise.reject();
				}
				showUpdateUserRightsConfirmation(id, selectedRole, roles, action);
			},
		});
	};

	useEffect(() => {
		if (!isUserAdmin) {
			navigate(-1);
		} else {
			getAllUsers(getFilters());
		}
	}, [searchParams]);

	return (
		<div className={styles.container}>
			<div className={styles.searchAndFilters}>
				<Form>
					<Input
						placeholder="Поиск"
						value={String(searchInputValue)}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setSearchInputValue(e.currentTarget.value);
							clearTimeout(debounceTimer.current);
							debounceTimer.current = setTimeout(() => {
								const searchValue = e.currentTarget.value;
								setSearchParams((prev) => {
									const newParams = new URLSearchParams(prev);
									if (searchValue) {
										newParams.set("search", searchValue);
									} else {
										newParams.delete("search");
									}
									return newParams;
								});
							}, 500);
						}}
					/>
				</Form>
				<Select
					className={styles.select}
					defaultValue={
						searchParams.get("isBlocked") === "true"
							? ONLYBLOCKEDUSERS
							: searchParams.get("isBlocked") === "false"
							? ONLYACTIVEUSERS
							: ALLUSERS
					}
					onChange={changeUserFilter}
					options={[
						{ value: ALLUSERS, label: ALLUSERS },
						{
							value: ONLYBLOCKEDUSERS,
							label: ONLYBLOCKEDUSERS,
						},
						{ value: ONLYACTIVEUSERS, label: ONLYACTIVEUSERS },
					]}
				/>
			</div>
			<Table
				className={styles.table}
				columns={columns}
				dataSource={users}
				rowKey="id"
				scroll={{ x: "max-content", y: "60vh" }}
				onChange={onChange}
			/>
		</div>
	);
};
