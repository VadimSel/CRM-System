import { useEffect } from "react"
import styles from './Main.module.scss'

export const Main = () => {
  useEffect(() => {
    console.log("Main загружен")
  }, [])

  return (
    <div className={styles.container}>
      Main
    </div>
  )
}