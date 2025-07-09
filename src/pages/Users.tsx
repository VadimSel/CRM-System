import { Button, Form, Input, Modal, notification, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
	blockUnblockUserApi,
	getUsers,
	removeUser,
	updatesUserRights,
} from "../api/adminApi";
import { blockUnlockTypes, Roles, User, UserFilters } from "../types/adminTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import styles from "./Users.module.scss";

export const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { confirm } = Modal;
	const navigate = useNavigate();

	const showDeleteConfirmation = (id: number) => {
		confirm({
			title: "Удалить пользователя?",
			okText: "Удалить",
			cancelText: "Отмена",
			centered: true,
			async onOk() {
				await deleteUser(id);
			},
		});
	};

	const showUpdateRightsConfirmation = (id: number, roles: Roles[]) => {
		confirm({
			title: `${roles.includes(Roles.ADMIN) ? "Забрать" : "Дать"} роль админинстратора?`,
			okText: "Да",
			cancelText: "Отмена",
			centered: true,
			async onOk() {
				setAdminRights(id, roles);
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
		pagination,
		filter,
		sorter,
		extra
	) => {
		const ord = sorter.order;
		const sortBy = sorter.field;
		const sortOrder = ord !== undefined ? ord.replace("end", "") : undefined;
		await getAllUsers({ sortOrder, sortBy });
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
				<Button danger onClick={() => showDeleteConfirmation(id)}>
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
				<Button onClick={() => showUpdateRightsConfirmation(id, record.roles)}>
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

	useEffect(() => {
		getAllUsers({});
	}, []);

	return (
		<div>
			<Form>
				<></>
				<Input
					placeholder="Поиск"
					onPressEnter={(e) => getAllUsers({ search: e.currentTarget.value })}
				/>
			</Form>
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
