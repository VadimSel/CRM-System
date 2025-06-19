import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router";
import { logoutApi } from "../api/authApi";
import { logout } from "../store/loginSlice";
import { accessTokenManager } from "../utils/accessTokenManager";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const dispatch = useDispatch();

	const location = useLocation();

	const pages: Record<string, string> = {
		"/profile": "1",
		"/tasks": "2",
	};

	const currentPage = pages[location.pathname];

	const logoutAcc = async () => {
		await logoutApi();
		accessTokenManager.clearToken();
		localStorage.removeItem("refreshToken");
		dispatch(logout());
	};

	const menuItems = [
		{ key: "1", label: <Link to={"profile"}>Личный кабинет</Link> },
		{ key: "2", label: <Link to={"tasks"}>Список Задач</Link> },
		{ key: "3", label: <p onClick={() => logoutAcc()}>Выход</p> },
	];

	return (
		<div className={styles.container}>
			<Menu selectedKeys={[`${currentPage}`]} className={styles.menu} items={menuItems} />
		</div>
	);
};
