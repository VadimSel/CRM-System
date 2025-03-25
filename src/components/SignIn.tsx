import { FormEvent, useState } from "react";
import styles from "./SignIn.module.scss";
// import { signIn } from "../api";

export const SignIn = () => {
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");

	function sendUserData(e: FormEvent) {
		e.preventDefault();
		// signIn(loginValue, passwordValue)
		console.log(loginValue, passwordValue);
	}

	// console.log(valueOne)

	return (
		<div>
			<form onSubmit={sendUserData} className={styles.container}>
				<div className={styles.loginAndPassword}>
					<input
						onChange={(e) => setLoginValue(e.target.value)}
						type="text"
						placeholder="Login"
					/>
					<input
						onChange={(e) => setPasswordValue(e.target.value)}
						type="text"
						placeholder="Password"
					/>
				</div>
				<button type="submit" className={styles.button}>
					Button
				</button>
			</form>
		</div>
	);
};
