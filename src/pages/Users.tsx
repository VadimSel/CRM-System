// import { Button, Modal, notification, Table, TableProps } from "antd";
// import { useEffect, useState } from "react";
// import { getUsers, removeUser } from "../api/adminApi";
// import { Roles, User } from "../types/adminTypes";
// import { ApiErrorHandler } from "../utils/ApiErrorHandler";

// export const Users = () => {
// 	const [users, setUsers] = useState<User[]>([]);

// 	const { confirm } = Modal;

// 	const showDeleteConfirmation = (id: number) => {
// 		confirm({
// 			title: "Удалить пользователя?",
// 			okText: "Удалить",
// 			cancelText: "Отмена",
// 			centered: true,
// 			async onOk() {
// 				deleteUser(id);
// 			},
// 		});
// 	};

// 	const deleteUser = async (id: number) => {
// 		try {
// 			await removeUser(id);
// 			notification.success({
// 				message: "Success",
// 				placement: "top",
// 			});
// 			getAllUsers();
// 		} catch (error) {
// 			ApiErrorHandler("adminDeleteUser", error);
// 		}
// 	};

// 	const columns: TableProps<User>["columns"] = [
// 		{ title: "Имя", dataIndex: "username", key: "username" },
// 		{ title: "Email", dataIndex: "email", key: "email" },
// 		{
// 			title: "Дата регистрации",
// 			dataIndex: "date",
// 			key: "date",
// 			render: (date: string) => new Date(date).toLocaleDateString(),
// 		},
// 		{
// 			title: "Статус блокировки",
// 			dataIndex: "isBlocked",
// 			key: "isBlocked",
// 			render: (isBlocked: boolean) => (isBlocked ? "Заблокирован" : "Не заблокирован"),
// 		},
// 		{
// 			title: "Роль",
// 			dataIndex: "roles",
// 			key: "roles",
// 			render: (roles: Roles[]) => roles.join(", "),
// 		},
// 		{ title: "Номер телефона", dataIndex: "phoneNumber", key: "phoneNumber" },
// 		{
// 			dataIndex: "id",
// 			key: "id",
// 			render: (id: number) => (
// 				<Button href={`/userProfile/${id}`}>Перейти к профилю</Button>
// 			),
// 		},
// 		{
// 			dataIndex: "id",
// 			key: "id",
// 			render: (id: number) => (
// 				<Button onClick={() => showDeleteConfirmation(id)}>Удалить</Button>
// 			),
// 		},
// 	];

// 	const getAllUsers = async () => {
// 		try {
// 			const res = await getUsers();
// 			setUsers(res);
// 			console.log(res);
// 		} catch (error) {
// 			ApiErrorHandler("adminGetUsers", error);
// 		}
// 	};

// 	useEffect(() => {
// 		getAllUsers();
// 	}, []);

// 	return <Table columns={columns} dataSource={users} rowKey="id" />;
// };

import { Button, Modal, notification, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { getUsers, removeUser } from "../api/adminApi";
import { Roles, User } from "../types/adminTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import { useNavigate } from "react-router";

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

	const deleteUser = async (id: number) => {
		try {
			await removeUser(id);
			notification.success({
				message: "Пользователь удалён",
				placement: "top",
			});
			getAllUsers();
		} catch (error) {
			ApiErrorHandler("adminDeleteUser", error);
		}
	};

	const columns: TableProps<User>["columns"] = [
		{
			title: "Имя",
			dataIndex: "username",
			key: "username",
			fixed: "left",
		},
		{ title: "Email", dataIndex: "email", key: "email", width: 200 },
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
			title: "Профиль",
			dataIndex: "id",
			key: "profile",
			fixed: "right",
			render: (id: number) => (
				<Button onClick={() => navigate(`/userProfile/${id}`)}>Перейти к профилю</Button>
			),
		},
		{
			title: "Удалить",
			dataIndex: "id",
			key: "delete",
			fixed: "right",
			render: (id: number) => (
				<Button danger onClick={() => showDeleteConfirmation(id)}>
					Удалить
				</Button>
			),
		},
	];

	const getAllUsers = async () => {
		try {
			const res = await getUsers();
			setUsers(res);
		} catch (error) {
			ApiErrorHandler("adminGetUsers", error);
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<div style={{ width: "70vw", overflowX: "auto" }}>
			<Table
				columns={columns}
				dataSource={users}
				rowKey="id"
				scroll={{ x: "max-content", y: "60vh" }}
			/>
		</div>
	);
};
