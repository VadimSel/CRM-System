import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { refreshToken } from "./api";
import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";
import { PersonalLayout } from "./layouts/PersonalLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { logged, logout } from "./store/loginSlice";
import { RootState } from "./store/store";

function App() {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch();

	const checkTokens = async () => {
		// if (!isLoggedIn) {
		// 	return;
		// }
		try {
			await refreshToken(String(localStorage.getItem("refreshToken")));
			dispatch(logged());
		} catch (error) {
			if (error) dispatch(logout());
		}
	};

	useEffect(() => {
		checkTokens();
	}, []);

	return (
		<div className={styles.container}>
			<BrowserRouter>
				<Routes>
					{isLoggedIn ? (
						<Route path="/" element={<PersonalLayout />}>
							<Route index element={<MainPage />} />
							<Route path="profile" element={<Profile />} />
						</Route>
					) : (
						<Route path="/" element={<PublicLayout />}>
							<Route index element={<SignIn />} />
							<Route path="signUp" element={<SignUp />} />
						</Route>
					)}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
