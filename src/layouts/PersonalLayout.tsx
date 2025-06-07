import { Outlet } from "react-router";
import { SideBar } from "../components/SideBar";
import styles from "./PersonalLayout.module.scss";

export const PersonalLayout = () => {
	return (
		<div className={styles.container}>
			<SideBar />
			<Outlet />
		</div>
	);
};
