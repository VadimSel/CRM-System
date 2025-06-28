import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../types/adminTypes";
import { getUserProfile } from "../api/adminApi";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import { Button, Form, Input } from "antd";
import {
	maxUserNameLength,
	minUserNameLength,
	userNameValidation,
} from "../constants/constants";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

export const UserProfile = () => {
	const [userInfo, setUserInfo] = useState<User>();
	const [isDataEdit, setIsDataEdit] = useState<boolean>(false);

	const [form] = Form.useForm();

	const { id } = useParams();
	const idValue = Number(id);

	const getUserInfo = async (idValue: number) => {
		try {
			setUserInfo(await getUserProfile(idValue));
		} catch (error) {
			ApiErrorHandler("adminGetUserProfile", error);
		}
	};

	const saveUserNewInfo = (value) => {
		console.log(value);
		setIsDataEdit(false);
	};

	useEffect(() => {
		getUserInfo(idValue);
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
					<Form.Item name="email">
						<span>Email пользователя: </span>
						<span>{userInfo?.email}</span>
					</Form.Item>
				</div>
				<div>
					<Form.Item name="phoneNumber">
						<span>Номер телефона: </span>
						<span>{userInfo?.phoneNumber}</span>
					</Form.Item>
				</div>
				{isDataEdit ? (
					<Button onClick={() => form.submit()}>Сохранить</Button>
				) : (
					<Button htmlType="button" onClick={() => setIsDataEdit(true)}>
						Редактировать
					</Button>
				)}
			</Form>
		</div>
	);
};
