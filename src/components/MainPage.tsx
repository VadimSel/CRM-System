import { useEffect, useState } from "react"
import styles from './Main.module.scss'
import { getTodos } from "../api"
import { MetaResponse, Todo, TodoInfo } from "../types"

export const MainPage = () => {
  const [data, setData] = useState<MetaResponse<Todo, TodoInfo>>()

  async function fetchData () {
    const data = await getTodos()
    if (data) {
      setData(data)
    }
  }

  useEffect(() => {
    console.log("MainPage загружен")
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {data?.map((el) => {
        return (
          <div>{el}</div>
        )
      })}
    </div>
  )
}