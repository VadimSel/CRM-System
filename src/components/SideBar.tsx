import { Menu } from "antd";
import { Link } from "react-router";
import styles from "./SideBar.module.scss";

export const SideBar = () => {
	const menuItems = [
		{ key: "1", label: <Link to={"/profile"}>Личный кабинет</Link> },
		{ key: "2", label: <Link to={"/"}>Список Задач</Link> },
	];

	return (
		<div className={styles.container}>
			<Menu className={styles.menu} items={menuItems} />
		</div>
	);
};
