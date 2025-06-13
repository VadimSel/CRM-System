import { Todo, TodoRequest } from "../types";
import styles from "./TodoItem.module.scss";

import { DeleteOutlined, EditOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { deleteTask, updateTask } from "../api";
import { maxTaskNameLength, minTaskNameLength } from "../constants/constants";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";

interface TodoItemTypes {
	todo: Todo;
	fetchData: () => void;
}

export const TodoItem = ({ todo, fetchData }: TodoItemTypes) => {
	const [taskIsEdit, setTaskIsEdit] = useState<boolean>(false);
	const [taskNewName, setTaskNewName] = useState<string>("");
	const [form] = Form.useForm();

	function taskEdit(newTitle: string) {
		setTaskNewName(newTitle);
		setTaskIsEdit(true);
	}

	async function taskEditData(id: number, newTitle: string, isDone: boolean) {
		const task: TodoRequest = {
			title: newTitle,
			isDone,
		};
		setTaskIsEdit(false);
		try {
			await updateTask(id, task);
			fetchData();
		} catch (error) {
			ApiErrorHandler(error);
		}
	}

	function cancelEdit() {
		setTaskIsEdit(false);
		form.resetFields();
	}

	async function removeTask(id: number) {
		try {
			await deleteTask(id);
			fetchData();
		} catch (error) {
			window.alert(error);
		}
	}

	return (
		<div key={todo.id} className={styles.taskWrapper}>
			<div className={styles.checkboxWrapper}>
				<Checkbox
					onChange={(e) => taskEditData(todo.id, todo.title, e.target.checked)}
					checked={todo.isDone}
				/>
			</div>
			<Form
				form={form}
				onFinish={(value) => taskEditData(todo.id, value.title, todo.isDone)}
				className={styles.form}
			>
				<Form.Item
					className={styles.formItem}
					name="title"
					initialValue={taskNewName}
					rules={[
						{ required: true, message: "Введите название" },
						{ min: minTaskNameLength, message: `Минимум ${minTaskNameLength} символа` },
						{ max: maxTaskNameLength, message: `Максимум ${maxTaskNameLength} символа` },
					]}
				>
					{taskIsEdit === true ? (
						<Input autoFocus={true} maxLength={64} />
					) : (
						<p className={todo.isDone === false ? styles.taskName : styles.taskIsDone}>
							{todo.title}
						</p>
					)}
				</Form.Item>
				{taskIsEdit === true && (
					<>
						<Button htmlType="submit" className={styles.taskEditButton}>
							<SaveOutlined className={styles.icon}/>
						</Button>
						<Button
							onClick={() => cancelEdit()}
							className={styles.taskDeleteButton}
						>
							<RollbackOutlined className={styles.icon}/>
						</Button>
					</>
				)}
			</Form>
			{taskIsEdit === false && (
				<>
					<Button onClick={() => taskEdit(todo.title)} className={styles.taskEditButton}>
						<EditOutlined className={styles.icon}/>
					</Button>
					<Button onClick={() => removeTask(todo.id)} className={styles.taskDeleteButton}>
						<DeleteOutlined className={styles.icon}/>
					</Button>
				</>
			)}
		</div>
	);
};
