import { Button, Form, Input } from "antd";
import { createTask } from "../api";
import { TodoRequest } from "../types";
import styles from "./AddTask.module.scss";

interface AddTaskTypes {
	fetchData: () => void;
}

export const AddTask = ({ fetchData }: AddTaskTypes) => {
	const [form] = Form.useForm();

	const handleAddTask = async (values: { taskName: string }) => {
		if (values.taskName.length <= 1 && values.taskName.length >= 64) {
			window.alert("Название должно быть больше 2 и меньше 64 символов");
			return;
		}
		const task: TodoRequest = {
			title: values.taskName,
			isDone: false,
		};
		try {
			await createTask(task);
			form.resetFields();
			fetchData();
		} catch (error) {
			window.alert(error);
		}
	};

	return (
		<Form form={form} onFinish={handleAddTask} className={styles.newTask}>
			<Form.Item
				name="taskName"
				rules={[
					{ required: true, message: "Введите название" },
					{ min: 2, message: "Минимум 2 символа" },
					{ max: 64, message: "Максимум 64 символа" },
				]}
			>
				<Input placeholder="Task To Be Done..." maxLength={64} />
			</Form.Item>
			<Button htmlType="submit">Add</Button>
		</Form>
	);
};
