import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";
import { Profile } from "./pages/Profile";
import { PersonalLayout } from "./layouts/PersonalLayout";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { PublicLayout } from "./layouts/PublicLayout";
import { Authorization } from "./pages/Authorization";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function App() {
	const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn.isLogged);

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
