import { useState } from "react";
import { createTask } from "../api";
import styles from "./AddTask.module.scss";

interface AddTaskTypes {
  fetchData: () => void
}

export const AddTask = ({fetchData}: AddTaskTypes) => {
  const [taskName, setTaskName] = useState<string>("");

	async function inputHandler() {
		if (taskName.length >= 2 || taskName.length > 64) {
			await createTask(false, taskName);
			setTaskName("");
			fetchData();
		} else {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
		}
	}

	return (
		<div className={styles.newTask}>
			<input
				onChange={(e) => setTaskName(e.target.value)}
				value={taskName}
				className={styles.taskName}
				type="text"
				placeholder="Task To Be Done..."
				minLength={2}
				maxLength={64}
			/>
			<button onClick={() => inputHandler()} className={styles.newTaskAddButton}>
				Add
			</button>
		</div>
	);
};
