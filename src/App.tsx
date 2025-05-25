import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";
import { Profile } from "./pages/Profile";
import { PersonalLayout } from "./layouts/PersonalLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { PublicLayout } from "./layouts/PublicLayout";
import { Authorization } from "./pages/Authorization";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { useEffect } from "react";
import { getTasks, refreshToken } from "./api";
import { logged, logout } from "./store/loginSlice";
import { TodoFilterEnum } from "./types";

function App() {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);
	const dispatch = useDispatch()

	const checkTokens = async () => {
		try {
			await refreshToken(String(localStorage.getItem("refreshToken")))
			dispatch(logged())
		} catch (error) {
			console.log(error.response.statusText)
			dispatch(logout())
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
							<Route index element={<Authorization />} />
							<Route path="SignIn" element={<SignIn />} />
							<Route path="SignUp" element={<SignUp />} />
						</Route>
					)}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
