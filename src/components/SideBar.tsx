import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Logout } from "../api";
import { logout } from "../store/loginSlice";
import { RootState } from "../store/store";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const isLogged = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch();

	const logoutAcc = async () => {
		await Logout();
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		dispatch(logout());
	};

	const menuItems = isLogged
		? [
				{ key: "1", label: <Link to={"/profile"}>Личный кабинет</Link> },
				{ key: "2", label: <Link to={"/"}>Список Задач</Link> },
				{ key: "3", label: <span onClick={() => logoutAcc()}>Выход</span> },
		  ]
		: [
				{ key: "4", label: <Link to={"/signIn"}>Авторизация</Link> },
				{ key: "5", label: <Link to={"/signUp"}>Регистрация</Link> },
		  ];

	return (
		<div className={styles.container}>
			<Menu className={styles.menu} items={menuItems} />
		</div>
	);
};
