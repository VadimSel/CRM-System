import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { refreshToken } from "./api/authApi";
import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";
import { PersonalLayout } from "./layouts/PersonalLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { Profile } from "./pages/Profile";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { logged, logout } from "./store/loginSlice";
import { accessTokenManager } from "./utils/accessTokenManager";

function App() {
	const [isChecking, setIsChecking] = useState<boolean>(true);
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
					<Route element={<PublicLayout />}>
						<Route path="/" element={<SignIn />} />
						<Route path="signUp" element={<SignUp />} />
					</Route>

					<Route element={<PersonalLayout />}>
						<Route path="tasks" element={<MainPage />} />
						<Route path="profile" element={<Profile />} />
					</Route>

					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
