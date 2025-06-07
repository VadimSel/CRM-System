import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { logoutApi } from "../api";
import { logout } from "../store/loginSlice";
import { RootState } from "../store/store";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const isLogged = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch();

	const location = useLocation();

	const currentPage =
		location.pathname === "/profile"
			? "1"
			: location.pathname === "/tasks"
			? "2"
			: location.pathname === "/"
			? "4"
			: location.pathname === "/signUp"
			? "5"
			: null;

	const logoutAcc = async () => {
		await logoutApi();
		localStorage.removeItem("accessToken");
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
			<Menu
				selectedKeys={[`${currentPage}`]}
				className={styles.menu}
				items={menuItems}
			/>
		</div>
	);
};
