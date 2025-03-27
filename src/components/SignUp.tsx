import { FormEvent, useState } from "react";
import styles from "./SignUp.module.scss";

export const SignUp = () => {
	const [emailValue, setEmailValue] = useState("");
	const [loginValue, setLoginValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [phoneNumberValue, setPhoneNumberValue] = useState("");
	const [usernameValue, setUsernameValue] = useState("");

  function submit (e: FormEvent) {
    e.preventDefault()
    console.log(emailValue, loginValue, passwordValue, phoneNumberValue, usernameValue)
  }

	return (
		<div className={styles.container}>
      <form onSubmit={(e) => {submit(e)}} className={styles.form}>
				<input required onChange={(e) => setEmailValue(e.target.value)} placeholder="Email" type="email" name="email" />
				<input required onChange={(e) => setLoginValue(e.target.value)} placeholder="Login" type="text" name="login" />
				<input required onChange={(e) => setPasswordValue(e.target.value)} placeholder="Password" type="password" name="password" />
				<input required onChange={(e) => setPhoneNumberValue(e.target.value.replace(/\D/, ""))} placeholder="Phone number" type="tel" minLength={11} maxLength={11} value={phoneNumberValue} name="phoneNumber" />
				<input required onChange={(e) => setUsernameValue(e.target.value)} placeholder="Username" type="text" name="username" />
				<button className={styles.button} type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};
