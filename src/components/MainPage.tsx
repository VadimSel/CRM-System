import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api";
import cancelIcon from "../assets/cancel-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import saveIcon from "../assets/save-icon.svg";
import deleteIcon from "../assets/trash-icon.svg";
import { MetaResponse, Todo, TodoInfo } from "../types";
import styles from "./MainPage.module.scss";

export const MainPage = () => {
	type StatusTypes = 1 | 2 | 3;

	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [taskName, setTaskName] = useState<string>("");
	const [taskNewName, setTaskNewName] = useState<string>("");
	const [taskIsEdit, setTaskIsEdit] = useState<boolean>(false);
	const [taskEditingId, setTaskEditingId] = useState<number>();
	const [status, setStatus] = useState<StatusTypes>(1);

	const filters: { id: number; value: keyof TodoInfo; status: string }[] = [
		{
			id: 1,
			value: "all",
			status: "Все",
		},
		{
			id: 2,
			value: "inWork",
			status: "в работе",
		},
		{
			id: 3,
			value: "completed",
			status: "сделано",
		},
	];

	async function fetchData() {
		const statusValue = status === 2 ? false : status === 3 && true;
		const data = await getTasks();
		if (data) {
			if ((status === 2 || status === 3) && tasks) {
				setTasks({
					...tasks,
					data: data.data.filter((task) => task.isDone === statusValue),
					info: data.info,
				});
			} else {
				setTasks(data);
			}
		}
	}

	async function inputHandler() {
		if (taskName.length >= 2 || taskName.length > 64) {
			await createTask(false, taskName);
			setTaskName("");
			fetchData();
		} else {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
		}
	}

	function taskEdit(id: number) {
		setTaskEditingId(id);
		setTaskIsEdit(true);
	}

	async function taskEditData(id: number, newTitle: string, isDone: boolean) {
		if (newTitle.length >= 2 || newTitle.length > 64) {
			setTaskIsEdit(false);
			await updateTask(id, isDone, newTitle);
			setTaskNewName("");
		} else {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
		}
		fetchData();
	}

	async function removeTask(id: number) {
		if (tasks) {
			const leftTasks = tasks.data.filter((task) => task.id !== id);
			setTasks({ ...tasks, data: leftTasks });
		}
		await deleteTask(id);
		fetchData();
	}

	useEffect(() => {
		fetchData();
	}, [status]);

	return (
		<div className={styles.container}>
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
			<div className={styles.filters}>
				{filters.map((el) => (
					<button
						key={el.id}
						className={el.id === status ? styles.active : ""}
						onClick={() => {
							setStatus(el.id as StatusTypes);
						}}
					>
						{el.status} ({tasks?.info && tasks.info[el.value]})
					</button>
				))}
			</div>
			{tasks?.data.map((el) => {
				return (
					<div key={el.id} className={styles.taskWrapper}>
						<div className={styles.checkboxWrapper}>
							<input
								className={styles.checkbox}
								type="checkbox"
								onChange={(e) => taskEditData(el.id, el.title, e.target.checked)}
								checked={el.isDone}
							/>
						</div>
						{taskIsEdit === true && taskEditingId === el.id ? (
							<input
								className={styles.taskNameEdit}
								autoFocus={true}
								onChange={(e) => setTaskNewName(e.target.value)}
								minLength={2}
								maxLength={64}
								value={taskNewName}
							/>
						) : (
							<p className={el.isDone === false ? styles.taskName : styles.taskIsDone}>
								{el.title}
							</p>
						)}
						{taskIsEdit === true && taskEditingId === el.id ? (
							<>
								<button
									onClick={() => taskEditData(el.id, taskNewName, el.isDone)}
									className={styles.taskEditButton}
								>
									<img src={saveIcon} alt="save" />
								</button>
								<button
									onClick={() => setTaskIsEdit(false)}
									className={styles.taskDeleteButton}
								>
									<img src={cancelIcon} alt="cancel" />
								</button>
							</>
						) : (
							<>
								<button
									onClick={() => {
										setTaskNewName(el.title);
										taskEdit(el.id);
									}}
									className={styles.taskEditButton}
								>
									<img src={editIcon} alt="edit" />
								</button>
								<button
									onClick={() => removeTask(el.id)}
									className={styles.taskDeleteButton}
								>
									<img src={deleteIcon} alt="delete" />
								</button>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};
