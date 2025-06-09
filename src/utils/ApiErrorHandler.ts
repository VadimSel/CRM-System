import { notification } from "antd";
import axios from "axios";
import { logout } from "../store/loginSlice";
import { store } from "../store/store";

export const ApiErrorHandler = async (error: unknown) => {
	if (axios.isAxiosError(error) && error.response) {
		if (
			error.response.data.trim() ===
			"Invalid credentials: token is expired - must auth again"
		) {
			store.dispatch(logout());
			return;
		} else if (error.response.data.trim() === "user already exists") {
			notification.error({
				message: "Пользователь уже существует",
				placement: "top",
			});
		} else if (error.response.data.trim() === "Invalid credentials") {
			notification.error({
				message: "Неверные логин или пароль",
				placement: "top",
			});
		} else {
			notification.error({
				message: error.response.data.trim(),
				placement: "top",
			});
		}
	}
};
