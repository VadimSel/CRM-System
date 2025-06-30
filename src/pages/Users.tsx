import { Button, Modal, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getUsers, removeUser } from "../api/adminApi";
import { Roles, User } from "../types/adminTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";

export const Users = () => {
	const [users, setUsers] = useState<User[]>([]);
	const { confirm } = Modal;

	const showDeleteConfirmation = (id: number) => {
		confirm({
			title: "Удалить пользователя?",
			okText: "Удалить",
			cancelText: "Отмена",
			onOk() {
				deleteUser(id);
			},
		});
	};

	const deleteUser = async (id: number) => {
		console.log(`Удалённ пользователь ${id}`);
		try {
			await removeUser(id);
		} catch (error) {
			ApiErrorHandler("adminDeleteUser", error);
		}
	};

	const columns: TableProps<User>["columns"] = [
		{ title: "Имя", dataIndex: "username", key: "username" },
		{ title: "Email", dataIndex: "email", key: "email" },
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
		{ title: "Номер телефона", dataIndex: "phoneNumber", key: "phoneNumber" },
		{
			dataIndex: "id",
			key: "id",
			render: (id: number) => (
				<Button href={`/userProfile/${id}`}>Перейти к профилю</Button>
			),
		},
		{
			dataIndex: "id",
			key: "id",
			render: (id: number) => (
				<Button onClick={() => showDeleteConfirmation(id)}>Удалить</Button>
			),
		},
	];

	const getAllUsers = async () => {
		setUsers(await getUsers());
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return <Table columns={columns} dataSource={users} rowKey="id" />;
};
