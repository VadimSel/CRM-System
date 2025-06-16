import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { logout } from "../store/loginSlice";
import { RootState } from "../store/store";
import styles from "./SideBar.module.scss";
import { accessTokenManager } from "../utils/accessTokenManager";
import { logoutApi } from "../api/authApi";

export const SideBar = () => {
	const isLogged = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch();

	const location = useLocation();

	const pages: Record<string, string> = {
		"/profile": "1",
		"/tasks": "2",
		"/": "3",
		"/signUp": "4",
	};

	const currentPage = pages[location.pathname];

	const logoutAcc = async () => {
		await logoutApi();
		accessTokenManager.clearToken();
		localStorage.removeItem("refreshToken");
		dispatch(logout());
	};

	const menuItems = isLogged
		? [
				{ key: "1", label: <Link to={"profile"}>Личный кабинет</Link> },
				{ key: "2", label: <Link to={"tasks"}>Список Задач</Link> },
				{ key: "3", label: <p onClick={() => logoutAcc()}>Выход</p> },
		  ]
		: [
				{ key: "4", label: <Link to={"/"}>Авторизация</Link> },
				{ key: "5", label: <Link to={"signUp"}>Регистрация</Link> },
		  ];

	return (
		<div className={styles.container}>
			<Menu selectedKeys={[`${currentPage}`]} className={styles.menu} items={menuItems} />
		</div>
	);
};
