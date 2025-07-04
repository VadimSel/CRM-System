import { Button, Form, Input, Modal, notification, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUsers, removeUser } from "../api/adminApi";
import { Roles, User, UserFilters } from "../types/adminTypes";
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
