import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logged } from "../store/loginSlice";
import { SignInTypes } from "../types";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import { userLoginValidation } from "../constants/constants";
import { accessTokenManager } from "../utils/accessTokenManager";
import { signInApi } from "../api/authApi";

export const SignIn = () => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const formSignInHandler = async (userData: SignInTypes) => {
		try {
			setIsLoading(true);
			const tokens = await signInApi(userData);
			accessTokenManager.setToken(tokens.accessToken)
			localStorage.setItem("refreshToken", tokens.refreshToken);
			dispatch(logged());
			navigate("tasks");
		} catch (error) {
			ApiErrorHandler(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form form={form} onFinish={formSignInHandler}>
			<Form.Item
				name="login"
				rules={[
					{ required: true, message: "Введите логин", whitespace: true },
					{
						pattern: userLoginValidation,
						message: "Только латинские символы",
					},
				]}
			>
				<Input placeholder="Login" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "Введите пароль", whitespace: true }]}
			>
				<Input.Password placeholder="Password" />
			</Form.Item>
			<Button htmlType="submit" loading={isLoading}>
				Войти
			</Button>
		</Form>
	);
};
