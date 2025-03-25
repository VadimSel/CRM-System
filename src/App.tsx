import { useEffect, useState } from "react";
import "./App.css";
import { getProfileWithToken, getUsers, signIn, signUp } from "./api";
import { Link } from "react-router";
import styles from "./App.module.scss";

function App() {
	const [users, setUsers] = useState([]);
	const [token, setToken] = useState("");

	async function getToken() {
		const token = await signIn();
		setToken(token);
		if (token) {
			getProfileWithToken(token);
		}
	}

	useEffect(() => {
		// getUsers()
		// login()
		// loginFun()
		// getProfile(token)
		token === "" ? getToken() : console.log("empty");
		// signUp("email", "login", "password", "phoneNumber", "username")
		// signUp(token, "login", password: "", phoneNumber: "", username: "")
	}, []);

	return (
		<div className={styles.container}>
			<Link to={"/signIn"}>Войти</Link>
			<Link to={"/signUp"}>Зарегистрироваться</Link>
		</div>
	);
}

export default App;
