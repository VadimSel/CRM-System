import styles from "./Authorization.module.scss";
import { Link } from "react-router";

export const Authorization = () => {
	return (
		<div className={styles.container}>
      <Link to={'SignIn'}>Войти</Link>
			<Link to={'signUp'}>Зарегистрироваться</Link>
		</div>
	);
};
