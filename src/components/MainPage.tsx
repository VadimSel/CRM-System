import { useEffect, useState } from "react";
import { createTask, getTasks, updateTask } from "../api";
import { MetaResponse, Todo, TodoInfo } from "../types";
import styles from "./Main.module.scss";

export const MainPage = () => {
	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [taskName, setTaskName] = useState<string>("");
	const [taskNewName, setTaskNewName] = useState("");
	const [taskIsEdit, setTaskIsEdit] = useState<boolean>(false);
	const [taskEditingId, setTaskEditingId] = useState<number>();

	async function fetchData() {
		const data = await getTasks();
		if (data) {
			setTasks(data);
		}
	}

	async function inputHandler() {
		await createTask(false, taskName);
		setTaskName("");
		await fetchData();
	}

	function taskEdit(id: number) {
		setTaskEditingId(id);
		setTaskIsEdit(true);
	}

	function taskEditName(id: number, newTitle: string, isDone: boolean) {
		setTaskEditingId(id);
		// const task = tasks?.data.filter((el) => el.id === id);
		// if (task) {
		// 	task[0].title = newTitle;
		// 	task[0].isDone = isDone;
		// }
		if (tasks) {			
			const newTask = tasks?.data.map((task) =>
				task.id === id ? { ...task, title: newTitle, isDone } : task
		);
		setTasks({ ...tasks, data: newTask });
		// console.log(task);
		// console.log(`id: ${taskEditingId}, newName: ${newTitle}, isDone: ${isDone}`);	
	}
		setTaskIsEdit(false);
		updateTask(id, isDone, newTitle);
		// await fetchData();
	}

	useEffect(() => {
		fetchData();
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
					<div key={el.id} className={styles.taskWrapper}>
						<div className={styles.checkboxWrapper}>
							<input
								className={styles.checkbox}
								type="checkbox"
								onChange={(e) => taskEditName(el.id, el.title, e.target.checked)}
								checked={el.isDone}
							/>
						</div>
						{taskIsEdit === true && taskEditingId === el.id ? (
							<input
								className={styles.taskNameEdit}
								autoFocus={true}
								onBlur={() => setTaskIsEdit(false)}
								onChange={(e) => setTaskNewName(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										taskEditName(el.id, taskNewName, el.isDone);
									}
								}}
							/>
						) : (
							<p className={styles.taskName} onClick={() => taskEdit(el.id)}>
								{el.title}
							</p>
						)}
						<button className={styles.taskEditButton}>
							<img src="" alt="edit" />
						</button>
						<button className={styles.taskDeleteButton}>
							<img src="" alt="delete" />
						</button>
					</div>
				);
			})}
		</div>
	);
};
