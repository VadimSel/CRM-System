import { Button, Col, Form, Input, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserProfile, updateUserInfo } from "../api/adminApi";
import {
	maxUserNameLength,
	minUserNameLength,
	phoneLength,
	userNameValidation,
} from "../constants/constants";
import { User } from "../types/adminTypes";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";

export const UserPage = () => {
	const navigate = useNavigate();
	const { Text } = Typography;

	const [userInfo, setUserInfo] = useState<User>();
	const [isDataEdit, setIsDataEdit] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [form] = Form.useForm();

	const { id } = useParams();
	const idValue = Number(id);

	const getUserInfo = async () => {
		try {
			setUserInfo(await getUserProfile(idValue));
		} catch (error) {
			ApiErrorHandler("adminGetUserProfile", error);
		}
	};

	function comparUserData<T>(oldUserData: T, newUserData: Partial<T>): Partial<T> {
		const data: Partial<T> = {};

		Object.keys(newUserData).forEach((key) => {
			const newValue = newUserData[key as keyof T];
			const oldValue = oldUserData[key as keyof T];
			if (newValue !== oldValue) {
				data[key as keyof T] = newValue;
			} else {
				return;
			}
		});
		return data;
	}

	const saveUserNewInfo = async (newUserInfo: Partial<User>) => {
		if (userInfo) {
			let newData: Partial<User> = {};

			newData = comparUserData(userInfo, newUserInfo);
			if (!Object.keys(newData).length) {
				setIsDataEdit(false);
				return;
			}

			try {
				setIsLoading(true);
				await updateUserInfo(idValue, newData);
				notification.success({
					message: "Данные обновлены",
					placement: "top",
				});
				getUserInfo();
			} catch (error) {
				ApiErrorHandler("adminUpdateUserProfile", error);
			} finally {
				setIsDataEdit(false);
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<Form form={form} id="formSubmit" onFinish={saveUserNewInfo}>
				<Col>
					<Text>Имя пользователя: </Text>
					{isDataEdit ? (
						<Form.Item
							name="username"
							initialValue={userInfo?.username}
							rules={[
								{ required: true, message: "Введите имя" },
								{
									min: minUserNameLength,
									message: `Минимум ${minUserNameLength} символ`,
									whitespace: true,
								},
								{
									pattern: new RegExp(userNameValidation),
									message: "Только русские/латинские символы",
								},
							]}
						>
							<Input placeholder="Имя пользователя" maxLength={maxUserNameLength} />
						</Form.Item>
					) : (
						<Text>{userInfo?.username}</Text>
					)}
				</Col>
				<Col>
					<Text>Email пользователя: </Text>
					{isDataEdit ? (
						<Form.Item
							name="email"
							initialValue={userInfo?.email}
							rules={[
								{ required: true, message: "Введите email" },
								{ type: "email", message: "Введите корректный email" },
							]}
						>
							<Input placeholder="Email" />
						</Form.Item>
					) : (
						<Text>{userInfo?.email}</Text>
					)}
				</Col>
				<Col>
					<Text>Номер телефона: </Text>
					{isDataEdit ? (
						<Form.Item
							name="phoneNumber"
							initialValue={userInfo?.phoneNumber}
							rules={[
								{ min: phoneLength, message: "Введите номер телефона начиная с +" },
							]}
						>
							<Input placeholder="Номер телефона" maxLength={phoneLength} />
						</Form.Item>
					) : (
						<Text>{userInfo?.phoneNumber}</Text>
					)}
				</Col>
				{isDataEdit ? (
					<Button key="save" htmlType="submit" form="formSubmit" loading={isLoading}>
						Сохранить
					</Button>
				) : (
					<Button key="edit" htmlType="button" onClick={() => setIsDataEdit(true)}>
						Редактировать
					</Button>
				)}
				<Button htmlType="button" onClick={() => navigate(-1)}>
					Вернутся назад
				</Button>
			</Form>
		</>
	);
};
