import { Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getUsers } from "../api/adminApi";
import { Roles, User } from "../types/adminTypes";

export const Users = () => {
	const [users, setUsers] = useState<User[]>([]);

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
			title: "",
			dataIndex: "id",
			key: "id",
			render: (id: number) => <Link to={`/userProfile/${id}`}>Перейти к профилю</Link>,
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
