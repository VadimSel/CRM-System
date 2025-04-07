import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../api";
import styles from "./SignIn.module.scss";

export const SignIn = () => {
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	async function sendUserData(e: FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		const res = await signIn(loginValue, passwordValue);
		if (res === true) {
			navigate("/mainPage");
			localStorage.setItem("isLogin", String(res))
		}
		setIsLoading(false);
	}

	return (
		<>
			{isLoading === true && (
				<div className={styles.loading}>
					<p>Загрузка...</p>
				</div>
			)}
			<form onSubmit={sendUserData} className={styles.container}>
				<div className={styles.loginAndPassword}>
					<input
						onChange={(e) => setLoginValue(e.target.value)}
						type="text"
						placeholder="Login"
					/>
					<input
						onChange={(e) => setPasswordValue(e.target.value)}
						type="password"
						placeholder="Password"
					/>
				</div>
				<button type="submit" className={styles.button}>
					Войти
				</button>
			</form>
		</>
	);
};
