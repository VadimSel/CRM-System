import { useEffect, useState } from "react";
import { createTask, getTasks } from "../api";
import { MetaResponse, Todo, TodoInfo } from "../types";
import styles from "./Main.module.scss";

import checkIcon from "../assets/check-icon.svg";

export const MainPage = () => {
	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [taskName, setTaskName] = useState<string>("");
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
							<input className={styles.checkbox} type="checkbox" />
							<img className={styles.checkIcon} src={checkIcon} alt="check" />
						</div>
						{taskIsEdit === true && taskEditingId === el.id ? (
							<input
								className={styles.taskNameEdit}
								autoFocus={true}
								onBlur={() => setTaskIsEdit(false)}
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
