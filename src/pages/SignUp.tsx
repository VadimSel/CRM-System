import { Button, Form, Input, message } from "antd";
import styles from "./SignUp.module.scss";
import {
	maxLoginLength,
	maxPasswordLength,
	maxUserNameLength,
	minLoginLength,
	minPasswordLength,
	minUserNameLength,
	phoneLength,
} from "../constants/constants";
import { ChangeEvent, useState } from "react";
import { SignUpTypes } from "../types";
import { signUp } from "../api";
import { ErrorNotification } from "../utils/ErrorNotification";
import axios from "axios";

export const SignUp = () => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const phoneNumberHandler = (e: string) => {
		form.setFieldValue("phone", e.replace(/\D/, ""));
	};

	const formSubmitHandler = async (userData: SignUpTypes) => {
		console.log(userData);
		try {
			setIsLoading(true);
			message.loading("Идёт регистрация");
			await signUp(userData);
			message.destroy();
			message.success("Успешно");
		} catch (error) {
			message.destroy();
			if (axios.isAxiosError(error) && error.response) {
				ErrorNotification(error.response.data);
			}
		}
		finally {
			setIsLoading(false)
		}
	};

	return (
		<Form form={form} onFinish={formSubmitHandler}>
			<Form.Item
				name="userName"
				rules={[
					{ required: true, message: "Введите имя" },
					{
						min: minUserNameLength,
						message: `Минимум ${minUserNameLength} символ`,
						whitespace: true,
					},
				]}
			>
				<Input placeholder="User name" maxLength={maxUserNameLength} />
			</Form.Item>
			<Form.Item
				name="login"
				rules={[
					{ required: true, message: "Введите логин" },
					{
						min: minLoginLength,
						message: `Минимум ${minLoginLength} символа`,
						whitespace: true,
					},
				]}
			>
				<Input placeholder="Login" maxLength={maxLoginLength} />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{ required: true, message: "Введите пароль" },
					{
						min: minPasswordLength,
						message: `Минимум ${minPasswordLength} символов`,
						whitespace: true,
					},
				]}
			>
				<Input.Password placeholder="Password" maxLength={maxPasswordLength} />
			</Form.Item>
			<Form.Item
				name="confirm"
				dependencies={["password"]}
				rules={[
					{ required: true, message: "Повторите пароль", whitespace: true },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (value && getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Пароли должны совпадать"));
						},
					}),
				]}
			>
				<Input.Password placeholder="Confirm password" maxLength={maxPasswordLength} />
			</Form.Item>
			<Form.Item
				name="email"
				rules={[
					{ required: true, message: "Введите email" },
					{ type: "email", message: "Введите корректный email" },
				]}
			>
				<Input placeholder="Email" />
			</Form.Item>
			<Form.Item
				name="phone"
				rules={[
					{ required: false, message: "Введите номер телефона" },
					{ min: phoneLength, message: "Введите номер телефона" },
				]}
			>
				<Input
					placeholder="Phone number"
					maxLength={phoneLength}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						phoneNumberHandler(e.currentTarget.value)
					}
					value={form.getFieldError("phone")}
				/>
			</Form.Item>
			<Button htmlType="submit" loading={isLoading}>
				Отправить
			</Button>
		</Form>
	);
};
