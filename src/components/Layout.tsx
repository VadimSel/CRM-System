import { Outlet } from "react-router"
import { SideBar } from "./SideBar"
import styles from './Layout.module.scss'

export const Layout = () => {
  return (
    <div className={styles.container}>
      <SideBar/>
      <Outlet/>
    </div>
  )
}