import { useNavigate } from "react-router"
import styles from './SideBar.module.scss'

export const  SideBar = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <p className={styles.profile} onClick={() => navigate("/profile")}>Профиль</p>
      <p className={styles.mainPage} onClick={() => navigate("/")}>Список Задач</p>
    </div>
  )
}