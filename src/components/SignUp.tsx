import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../api";
import styles from "./SignUp.module.scss";

export const SignUp = () => {
	const [emailValue, setEmailValue] = useState<string>("");
	const [loginValue, setLoginValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
	const [usernameValue, setUsernameValue] = useState<string>("");

	const [isLoading, setisLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	function submit(e: FormEvent) {
		e.preventDefault();
		setisLoading(true);
		answerFromApi();
	}

	async function answerFromApi() {
		const res = await signUp(
			emailValue,
			loginValue,
			passwordValue,
			phoneNumberValue,
			usernameValue
		);
		if (res === true) {
			navigate("/signIn");
		}
		setisLoading(false)
	}

	return (
		<div className={styles.container}>
			{isLoading === true && (
				<div className={styles.loading}>
					<p>Загрузка...</p>
				</div>
			)}
			<form
				onSubmit={(e) => {
					submit(e);
				}}
				className={styles.form}
			>
				<input
					required
					onChange={(e) => setEmailValue(e.target.value)}
					placeholder="Email"
					type="email"
				/>
				<input
					required
					onChange={(e) => setLoginValue(e.target.value)}
					placeholder="Login"
					type="text"
				/>
				<input
					required
					onChange={(e) => setPasswordValue(e.target.value)}
					placeholder="Password"
					type="password"
				/>
				<input
					required
					onChange={(e) => setPhoneNumberValue(e.target.value.replace(/\D/, ""))}
					placeholder="Phone number"
					type="tel"
					minLength={11}
					maxLength={11}
					value={phoneNumberValue}
				/>
				<input
					required
					onChange={(e) => setUsernameValue(e.target.value)}
					placeholder="Username"
					type="text"
				/>
				<button className={styles.button} type="submit">
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
