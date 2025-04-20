import { useEffect, useState } from "react";
import { getTasks } from "../api";
import { MetaResponse, StatusTypes, Todo, TodoInfo } from "../types";
import { AddTask } from "./AddTask";
import { ChangeList } from "./ChangeList";
import styles from "./MainPage.module.scss";
import { TodoItem } from "./TodoItem";

export const MainPage = () => {

	const [tasks, setTasks] = useState<MetaResponse<Todo, TodoInfo>>();
	const [status, setStatus] = useState<StatusTypes>(1);

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

	useEffect(() => {
		fetchData();
	}, [status]);

	return (
		<div className={styles.container}>
			<AddTask fetchData={fetchData}/>
			<ChangeList tasks={tasks} status={status} setStatus={setStatus}/>
			<TodoItem tasks={tasks} fetchData={fetchData} setTasks={setTasks}/>
		</div>
	);
};
