import { notification } from "antd";
import axios from "axios";
import { refreshToken } from "../api";

export const ApiErrorHandler = async (error: unknown) => {
	if (axios.isAxiosError(error) && error.response) {
		if (error.response.statusText === "Unauthorized") {
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
		} else if (error.response.data === "user already exist") {
			notification.error({
				message: String("Неверные логин или пароль"),
				placement: "top",
			});
		} else {
			notification.error({
				message: String(error.response.data),
				placement: "top",
			});
			console.log(error);
		}
	}
};
