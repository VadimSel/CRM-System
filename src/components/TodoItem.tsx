import { useState } from "react";
import { MetaResponse, Todo, TodoInfo } from "../types";
import styles from "./TodoItem.module.scss";
import { deleteTask, updateTask } from "../api";

import cancelIcon from "../assets/cancel-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import saveIcon from "../assets/save-icon.svg";
import deleteIcon from "../assets/trash-icon.svg";

interface TodoItemTypes {
	tasks?: MetaResponse<Todo, TodoInfo>;
  setTasks: (tasks: MetaResponse<Todo, TodoInfo>) => void
  fetchData: () => void
};

export const TodoItem = ({ tasks, setTasks, fetchData }: TodoItemTypes) => {
  const [taskEditingId, setTaskEditingId] = useState<number>();
	const [taskIsEdit, setTaskIsEdit] = useState<boolean>(false);
  const [taskNewName, setTaskNewName] = useState<string>("");

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

	return (
		<>
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
		</>
	);
};
