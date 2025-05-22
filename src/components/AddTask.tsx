import { Button, Form, Input } from "antd";
import { createTask } from "../api";
import { maxTaskNameLength, minTaskNameLength } from "../constants/constants";
import { TodoRequest } from "../types";
import { ErrorNotification } from "../utils/ErrorNotification";
import styles from "./AddTask.module.scss";

interface AddTaskTypes {
	fetchData: () => void;
}

export const AddTask = ({ fetchData }: AddTaskTypes) => {
	const [form] = Form.useForm();

	const handleAddTask = async (values: { taskName: string }) => {
		const task: TodoRequest = {
			title: values.taskName,
			isDone: false,
		};
		try {
			await createTask(task);
			form.resetFields();
			fetchData();
		} catch (error) {
			ErrorNotification(error)
		}
	};

	return (
		<Form form={form} onFinish={handleAddTask} className={styles.newTask}>
			<Form.Item
				name="taskName"
				rules={[
					{ required: true, message: "Введите название" },
					{ min: minTaskNameLength, message: `Минимум ${minTaskNameLength} символа` },
					{ max: maxTaskNameLength, message: `Максимум ${maxTaskNameLength} символа` },
				]}
			>
				<Input placeholder="Task To Be Done..." maxLength={64} />
			</Form.Item>
			<Button htmlType="submit">Add</Button>
		</Form>
	);
};
