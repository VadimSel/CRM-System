import { Button, Form, Input, notification } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
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

export const UserProfile = () => {
	const navigate = useNavigate();

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

	const saveUserNewInfo = async (newUserInfo: Partial<User>) => {
		if (userInfo) {
			const newData: Partial<User> = {};

			if (newUserInfo.email !== userInfo.email) {
				newData.email = newUserInfo.email;
			}
			if (newUserInfo.phoneNumber !== userInfo.phoneNumber) {
				newData.phoneNumber = newUserInfo.phoneNumber;
			}
			if (newUserInfo.username !== userInfo.username) {
				newData.username = newUserInfo.username;
			}

			try {
				setIsLoading(true);
				await updateUserInfo(
					idValue,
					newData.email,
					newData.phoneNumber,
					newData.username
				);
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

	const phoneNumberHandler = (e: string) => {
		form.setFieldValue("phoneNumber", "+" + e.replace(/\D/g, ""));
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {
		if (userInfo) {
			form.setFieldsValue({
				username: userInfo.username,
				email: userInfo.email,
				phoneNumber: userInfo.phoneNumber,
			});
		}
	}, [userInfo]);

	return (
		<div>
			<Form form={form} onFinish={(value) => saveUserNewInfo(value)}>
				<div>
					<span>Имя пользователя: </span>
					{isDataEdit ? (
						<Form.Item
							name="username"
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
						<span>{userInfo?.username}</span>
					)}
				</div>
				<div>
					<div>
						<span>Email пользователя: </span>
						{isDataEdit ? (
							<Form.Item
								name="email"
								rules={[
									{ required: true, message: "Введите email" },
									{ type: "email", message: "Введите корректный email" },
								]}
							>
								<Input placeholder="Email" />
							</Form.Item>
						) : (
							<span>{userInfo?.email}</span>
						)}
					</div>
				</div>
				<div>
					<span>Номер телефона: </span>
					{isDataEdit ? (
						<Form.Item
							name="phoneNumber"
							rules={[
								{ required: true, message: "Введте номер телефона" },
								{ min: phoneLength, message: "Введите номер телефона" },
							]}
						>
							<Input
								placeholder="Номер телефона"
								maxLength={phoneLength}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									phoneNumberHandler(e.currentTarget.value);
								}}
							/>
						</Form.Item>
					) : (
						<span>{userInfo?.phoneNumber}</span>
					)}
				</div>
				{isDataEdit ? (
					<Button onClick={() => form.submit()} loading={isLoading}>
						Сохранить
					</Button>
				) : (
					<Button htmlType="button" onClick={() => setIsDataEdit(true)}>
						Редактировать
					</Button>
				)}
				<Button htmlType="button" onClick={() => navigate(-1)}>
					Вернутся назад
				</Button>
			</Form>
		</div>
	);
};
