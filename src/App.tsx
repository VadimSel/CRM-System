import { useEffect, useState } from "react";
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
import { accessTokenManager } from "./utils/accessTokenManager";

function App() {
	const [isChecking, setIsChecking] = useState<boolean>(true);
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch();

	const checkTokens = async () => {
		try {
			const res = await refreshToken(String(localStorage.getItem("refreshToken")));
			accessTokenManager.setToken(res.accessToken);
			localStorage.setItem("refreshToken", res.refreshToken);
			dispatch(logged());
		} catch {
			dispatch(logout());
		} finally {
			setIsChecking(false);
		}
	};

	useEffect(() => {
		if (localStorage.getItem("refreshToken")) {
			checkTokens();
		} else {
			setIsChecking(false);
		}
	}, []);

	if (isChecking) return null;

	return (
		<div className={styles.container}>
			<BrowserRouter>
				<Routes>
					{isLoggedIn ? (
						<Route path="/" element={<PersonalLayout />}>
							<Route index element={<Navigate to="tasks" />} />
							<Route path="tasks" element={<MainPage />} />
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
