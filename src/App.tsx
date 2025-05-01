import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";

function App() {
	return (
		<div className={styles.container}>
			<MainPage/>
		</div>
	);
}

export default App;
