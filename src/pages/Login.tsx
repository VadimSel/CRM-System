import { Button, Form, Input } from "antd";
import styles from "./Login.module.scss";

export const LogIn = () => {
	const [form] = Form.useForm();

	return (
		<Form form={form}>
			<Form.Item
				name="login"
				rules={[{ required: true, message: "Введите логин", whitespace: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[{ required: true, message: "Введите пароль", whitespace: true }]}
			>
				<Input.Password />
			</Form.Item>
			<Button>Войти</Button>
		</Form>
	);
};
