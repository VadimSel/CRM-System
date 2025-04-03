import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api";
import { MetaResponse, Todo, TodoInfo } from "../types";
import editIcon from '../assets/edit-icon.svg'
import deleteIcon from '../assets/trash-icon.svg'
import styles from "./Main.module.scss";

export const MainPage = () => {
	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [taskName, setTaskName] = useState<string>("");
	const [taskNewName, setTaskNewName] = useState<string>("");
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
		if (tasks) {
			const newTask = tasks?.data.map((task) =>
				task.id === id ? { ...task, title: newTitle, isDone } : task
			);
			setTasks({ ...tasks, data: newTask });
		}
		setTaskIsEdit(false);
		updateTask(id, isDone, newTitle);
	}

	function removeTask(id: number) {
		if (tasks) {
			const leftTasks = tasks.data.filter((task) => task.id !== id);
			setTasks({ ...tasks, data: leftTasks });
		}
		deleteTask(id);
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
						<button onClick={() => taskEdit(el.id)} className={styles.taskEditButton}>
							<img src={editIcon} alt="edit" />
						</button>
						<button onClick={() => removeTask(el.id)} className={styles.taskDeleteButton}>
							<img src={deleteIcon} alt="delete" />
						</button>
					</div>
				);
			})}
		</div>
	);
};
