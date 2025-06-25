import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../store/store";
import styles from "./PublicLayout.module.scss";

export const AuthLayout = () => {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);

	return (
		<div className={styles.container}>
			{!isLoggedIn ? <Outlet /> : <Navigate to={"tasks"} />}
		</div>
	);
};
