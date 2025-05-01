import { useState } from "react";
import { createTask } from "../api";
import styles from "./AddTask.module.scss";
import { TodoRequest } from "../types";

interface AddTaskTypes {
	fetchData: () => void;
}

export const AddTask = ({ fetchData }: AddTaskTypes) => {
	const [taskName, setTaskName] = useState<string>("");

	async function taskValidation() {
		if (taskName.length <= 1 && taskName.length >= 64) {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
			return;
		}
		const task: TodoRequest = {
			title: taskName,
			isDone: false,
		};
		try {
			await createTask(task);
			setTaskName("");
			fetchData();
		} catch (error) {
			window.alert(error);
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				taskValidation();
			}}
			className={styles.newTask}
		>
			<input
				onChange={(e) => setTaskName(e.target.value)}
				value={taskName}
				className={styles.taskName}
				type="text"
				placeholder="Task To Be Done..."
				minLength={2}
				maxLength={64}
			/>
			<button type="submit" className={styles.newTaskAddButton}>
				Add
			</button>
		</form>
	);
};
