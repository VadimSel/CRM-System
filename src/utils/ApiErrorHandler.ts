import { notification } from "antd";
import axios from "axios";
import { refreshToken } from "../api";

export const ApiErrorHandler = async (error: unknown) => {
	if (axios.isAxiosError(error) && error.response) {
		if (
			error.response.data.trim() ===
			"Invalid credentials: token is expired - must auth again"
		) {
			try {
				const refreshTokenRes = await refreshToken(
					String(localStorage.getItem("refreshToken"))
				);
				localStorage.setItem("accessToken", refreshTokenRes.accessToken);
				localStorage.setItem("refreshToken", refreshTokenRes.refreshToken);
			} catch (error) {
				notification.error({
					message: `Ошибка при получении нового токена: ${error}`,
					placement: "top",
				});
			}
		} else if (error.response.data.trim() === "user already exist") {
			notification.error({
				message: "Пользователь уже существует",
				placement: "top",
			});
		} else if (error.response.data.trim() === "Invalid credentials") {
			notification.error({
				message: "Неверный логин или пароль",
				placement: "top",
			});
		} else {
			notification.error({
				message: error.response.data,
				placement: "top"
			})
		}
	}
};
