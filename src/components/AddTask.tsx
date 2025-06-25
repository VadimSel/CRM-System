import { Button, Form, Input } from "antd";
import { maxTaskNameLength, minTaskNameLength } from "../constants/constants";
import { ApiErrorHandler } from "../utils/ApiErrorHandler";
import styles from "./AddTask.module.scss";
import { createTask } from "../api/todoApi";
import { TodoRequest } from "../types/todoTypes";

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
			ApiErrorHandler("createTask", error);
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
