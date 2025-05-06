import { Todo, TodoRequest } from "../types";
import styles from "./TodoItem.module.scss";

import cancelIcon from "../assets/cancel-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import saveIcon from "../assets/save-icon.svg";
import deleteIcon from "../assets/trash-icon.svg";
import { useState } from "react";
import { deleteTask, updateTask } from "../api";

interface TodoItemTypes {
	todo: Todo;
	fetchData: () => void;
}

export const TodoItem = ({ todo, fetchData }: TodoItemTypes) => {
	const [taskIsEdit, setTaskIsEdit] = useState<boolean>(false);
	const [taskNewName, setTaskNewName] = useState<string>("");

	function taskEdit(newTitle: string) {
		setTaskNewName(newTitle);
		setTaskIsEdit(true);
	}

	async function taskEditData(id: number, newTitle: string, isDone: boolean) {
		if (newTitle.length >= 2 || newTitle.length > 64) {
			const task: TodoRequest = {
				title: newTitle,
				isDone,
			};
			setTaskIsEdit(false);
			await updateTask(id, task);
			setTaskNewName("");
			fetchData();
		} else {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
		}
	}

	async function removeTask(id: number) {
		await deleteTask(id);
		fetchData();
	}

	return (
		<div key={todo.id} className={styles.taskWrapper}>
			<div className={styles.checkboxWrapper}>
				<input
					className={styles.checkbox}
					type="checkbox"
					onChange={(e) => taskEditData(todo.id, todo.title, e.target.checked)}
					checked={todo.isDone}
				/>
			</div>
			{taskIsEdit === true ? (
				<input
					className={styles.taskNameEdit}
					autoFocus={true}
					onChange={(e) => setTaskNewName(e.target.value)}
					minLength={2}
					maxLength={64}
					value={taskNewName}
				/>
			) : (
				<p className={todo.isDone === false ? styles.taskName : styles.taskIsDone}>
					{todo.title}
				</p>
			)}
			{taskIsEdit === true ? (
				<>
					<button
						onClick={() => taskEditData(todo.id, taskNewName, todo.isDone)}
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
					<button onClick={() => taskEdit(todo.title)} className={styles.taskEditButton}>
						<img src={editIcon} alt="edit" />
					</button>
					<button onClick={() => removeTask(todo.id)} className={styles.taskDeleteButton}>
						<img src={deleteIcon} alt="delete" />
					</button>
				</>
			)}
		</div>
	);
};
