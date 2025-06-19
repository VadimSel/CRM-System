import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { SideBar } from "../components/SideBar";
import { RootState } from "../store/store";
import styles from "./PersonalLayout.module.scss";

export const PersonalLayout = () => {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);

	return (
		<div className={styles.container}>
			<SideBar />
			{isLoggedIn ? <Outlet /> : <Navigate to={"/"} />}
		</div>
	);
};
