import { Navigate, Outlet } from "react-router";
import { SideBar } from "../components/SideBar";
import styles from "./PublicLayout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const PublicLayout = () => {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);

	return (
		<div className={styles.container}>
			<SideBar />
			{!isLoggedIn ? <Outlet /> : <Navigate to={"tasks"} />}
		</div>
	);
};
