import { FormEvent, useState } from "react";
import { createTask } from "../api";
import styles from "./AddTask.module.scss";
import { TodoRequest } from "../types";
import { Button, Form, Input } from "antd";

interface AddTaskTypes {
	fetchData: () => void;
}

export const AddTask = ({ fetchData }: AddTaskTypes) => {
	const [taskName, setTaskName] = useState<string>("");

	const handleAddTask = async () => {
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
	};

	return (
		<Form onFinish={handleAddTask} className={styles.newTask}>
			<Form.Item
				name="taskNamess"
				rules={[
					{ required: true, message: "Введите название" },
					{ min: 2, message: "Минимум 2 символа" },
					{ max: 64, message: "Максимум 64 символа" },
				]}
			>
				<Input
					onChange={(e) => setTaskName(e.target.value)}
					value={taskName}
					placeholder="Task To Be Done..."
					maxLength={64}
				/>
			</Form.Item>
			<Button htmlType="submit">Add</Button>
		</Form>
	);
};
