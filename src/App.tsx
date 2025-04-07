import { useEffect } from "react";
import { Link } from "react-router";
import "./App.css";
import styles from "./App.module.scss";

function App() {

	useEffect(() => {
	}, []);

	return (
		<div className={styles.container}>
			<Link to={"/signIn"}>Войти</Link>
			<Link to={"/signUp"}>Зарегистрироваться</Link>
		</div>
	);
}

export default App;
