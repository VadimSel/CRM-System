import { useEffect, useState } from "react";
import { createTask, getTasks } from "../api";
import { MetaResponse, Todo, TodoInfo } from "../types";
import styles from "./Main.module.scss";

export const MainPage = () => {
	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [taskName, setTaskName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("")

	async function fetchData() {
		const data = await getTasks();
		console.log(data);
		if (data) {
			setTasks(data);
		}
    // console.log(taskName)
    // setInputValue("")
    // setTaskName("")
	}

	async function inputHandler() {
    // setTaskName(inputValue)
		await createTask(false, taskName);
    setTaskName("")
    console.log(" На момент inputHandler taskName равен: " + taskName)
    await fetchData()
	}

	useEffect(() => {
		// console.log("MainPage загружен или перерисован");
		fetchData();
    console.log(" На момент useEffect taskName равен: " + taskName)
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.newTask}>
				<input
					onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							inputHandler();
						}
					}}
					className={styles.taskName}
					type="text"
					placeholder="Task To Be Done..."
				/>
				<button onClick={() => inputHandler()} className={styles.newTaskAddButton}>
					Add
				</button>
			</div>
			{tasks?.data.map((el) => {
				return (
					<div key={el.id}>
						<p>{el.title}</p>
					</div>
				);
			})}
		</div>
	);
};
