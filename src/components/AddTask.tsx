import { Button, Form, Input, notification } from "antd";
import { createTask } from "../api";
import { TodoRequest } from "../types";
import styles from "./AddTask.module.scss";
import { maxTaskNameChar, minTaskNameChar } from "../constants/constants";

interface AddTaskTypes {
	fetchData: () => void;
}

const errorNotification = (error: unknown) => {
	notification.error({
		message: String(error),
		placement: "top"
	})
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
			errorNotification(error)
		}
	};

	return (
		<Form form={form} onFinish={handleAddTask} className={styles.newTask}>
			<Form.Item
				name="taskName"
				rules={[
					{ required: true, message: "Введите название" },
					{ min: 2, message: `Минимум ${minTaskNameChar} символа` },
					{ max: 64, message: `Максимум ${maxTaskNameChar} символа` },
				]}
			>
				<Input placeholder="Task To Be Done..." maxLength={64} />
			</Form.Item>
			<Button htmlType="submit">Add</Button>
		</Form>
	);
};
