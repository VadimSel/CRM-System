import { Outlet } from "react-router";
import { SideBar } from "../components/SideBar";
import styles from "./PublicLayout.module.scss";

export const PublicLayout = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<Outlet />
		</div>
	);
};
