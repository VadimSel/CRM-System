import {
	Button,
	Form,
	Input,
	Modal,
	notification,
	Select,
	Table,
	TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
	blockUnblockUserApi,
	getUsers,
	removeUser,
	updatesUserRights,
} from "../api/adminApi";
import { blockUnlockTypes, Roles, User, UserFilters } from "../types/adminTypes";
import { userFilters } from "../types/commonTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import styles from "./Users.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isBockedValue, setIsBlockedValue] = useState<boolean | undefined>(undefined);
	const isUserAdmin = useSelector((state: RootState) => state.isLoggedIn.isAdmin);
	const { confirm } = Modal;
	const navigate = useNavigate();

	const { ALLUSERS, ONLYBLOCKEDUSERS, ONLYACTIVEUSERS } = userFilters;

	const showConfirmation = (id: number, roles?: Roles[]) => {
		confirm({
			title: `${
				roles
					? `${roles.includes(Roles.ADMIN) ? "Забрать" : "Дать"} роль админинстратора?`
					: "Удалить пользователя?"
			}`,
			okText: "Да",
			cancelText: "Отмена",
			centered: true,
			async onOk() {
				if (roles) {
					await setAdminRights(id, roles);
				} else {
					await deleteUser(id);
				}
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
			getAllUsers({});
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
					getAllUsers({});
				} catch (error) {
					ApiErrorHandler("blockUnblockUser", error);
				}
			},
		});
	};

	const setAdminRights = async (id: number, roles: Roles[]) => {
		const userRights = [...roles];
		if (!userRights.includes(Roles.ADMIN)) {
			try {
				userRights.push(Roles.ADMIN);
				await updatesUserRights(id, { roles: userRights });
				notification.success({
					message: "Роль админинстратора добавлена",
					placement: "top",
				});
				getAllUsers({});
			} catch (error) {
				ApiErrorHandler("updatesUserRights", error);
			}
		} else {
			try {
				const removeAdmin = userRights.filter((el) => {
					return el !== Roles.ADMIN;
				});
				await updatesUserRights(id, { roles: removeAdmin });
				notification.success({
					message: "Роль админинстратора убрана",
					placement: "top",
				});
				getAllUsers({});
			} catch (error) {
				ApiErrorHandler("updatesUserRights", error);
			}
		}
	};

	const onChange: TableProps<User>["onChange"] = async (
		_pagination,
		_filter,
		sorter,
		_extra
	) => {
		const sort = Array.isArray(sorter) ? sorter[0] : sorter;
		const ord = sort?.order;
		const sortBy = String(sort?.field);
		const sortOrder = ord === "ascend" ? "asc" : "desc";
		await getAllUsers({ sortOrder, sortBy, isBlocked: isBockedValue });
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
			render: (date: string) => new Date(date).toLocaleDateString(),
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
			key: "profile",
			fixed: "right",
			render: (id: number) => (
				<Button onClick={() => navigate(`/userProfile/${id}`)}>Профиль</Button>
			),
		},
		{
			dataIndex: "id",
			key: "delete",
			fixed: "right",
			render: (id: number) => (
				<Button danger onClick={() => showConfirmation(id)}>
					Удалить
				</Button>
			),
		},
		{
			dataIndex: "id",
			key: "blockUnblock",
			fixed: "right",
			render: (id: number, record: User) => (
				<Button
					onClick={() => blockUnblockUser(id, record.isBlocked ? "unblock" : "block")}
				>
					{record.isBlocked ? "Разблокировать" : "Заблокировать"}
				</Button>
			),
		},
		{
			dataIndex: "id",
			key: "setAdmin",
			fixed: "right",
			render: (id: number, record: User) => (
				<Button onClick={() => showConfirmation(id, record.roles)}>
					{record.roles.includes(Roles.ADMIN) ? "Забрать" : "Дать"} роль админа
				</Button>
			),
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
		setIsBlockedValue(filterValue);
		await getAllUsers({ isBlocked: filterValue });
	};

	useEffect(() => {
		if (!isUserAdmin) navigate(-1);
		getAllUsers({});
	}, []);

	return (
		<div>
			<div className={styles.searchAndFilters}>
				<Form>
					<></>
					<Input
						placeholder="Поиск"
						onPressEnter={(e) => getAllUsers({ search: e.currentTarget.value })}
					/>
				</Form>
				<Select
					className={styles.select}
					defaultValue={ALLUSERS}
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
