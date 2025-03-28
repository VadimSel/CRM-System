import { useEffect } from "react"
import styles from './Main.module.scss'

export const MainPage = () => {
  useEffect(() => {
    console.log("MainPage загружен")
  }, [])

  return (
    <div className={styles.container}>
      Main Page
    </div>
  )
}