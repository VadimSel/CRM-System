import { notification } from "antd";
import axios from "axios";
import { logout } from "../store/loginSlice";
import { store } from "../store/store";
import { RequestTypes } from "../types/commonTypes";

const err: Record<string, Record<number, string>> = {
	signUp: {
		400: "Неверный ввод",
		409: "Пользователь уже существует",
	},
	signIn: {
		400: "Неверный ввод",
		401: "Неверные данные",
	},
	refreshToken: {
		400: "Ошибка при разборе JSON-запроса",
		401: "Требуется повторная авторизация",
	},
	logout: {
		401: "Данные пользователя для выхода не найдены или отсутствуют",
	},
	createTask: {
		400: "Некорректные данные или заполнены не все поля",
	},
	updateTask: {
		400: "Неверное тело запроса, отсутствуют или некорректны поля, либо неверный идентификатор",
		401: "Таска не найдена",
	},
	deleteTask: {
		400: "Неверный или отсутствующий ID задачи",
		404: "Таска не найдена",
	},
};

export const ApiErrorHandler = async (request: RequestTypes, error: unknown) => {
	if (axios.isAxiosError(error) && error.response) {
		const errorStatus = error.response.status;
		if (request !== "refreshToken") {
			notification.error({
				message: errorStatus !== 500 ? err[request]?.[errorStatus] : "Внутренняя ошибка",
				placement: "top",
			});
		} else {
			store.dispatch(logout());
			return;
		}
	}
};
