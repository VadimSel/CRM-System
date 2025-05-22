import { Button, Form, Input } from "antd";
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
import { ChangeEvent } from "react";

export const SignUp = () => {
	const [form] = Form.useForm();

	const PhoneNumberHandler = (e: string) => {
		// const onlyNums = e.replace(/\D/g, "");
		form.setFieldValue("phone", e.replace(/\D/, ""));
	};

	return (
		<Form form={form}>
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
						PhoneNumberHandler(e.currentTarget.value)
					}
					value={form.getFieldError("phone")}
				/>
			</Form.Item>
			<Button htmlType="submit">Отправить</Button>
		</Form>
	);
};
