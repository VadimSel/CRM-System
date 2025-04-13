import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./App.css";
import styles from "./App.module.scss";

function App() {

	const navigate = useNavigate()

	useEffect(() => {
		navigate("/mainPage")
	}, []);

	return (
		<div className={styles.container}>
			<p>Loading...</p>
		</div>
	);
}

export default App;
