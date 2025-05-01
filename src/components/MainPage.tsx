import { useEffect, useState } from "react";
import { getTasks } from "../api";
import { Todo, TodoInfo, TodoStatusTypes } from "../types";
import { AddTask } from "./AddTask";
import { ChangeList } from "./ChangeList";
import styles from "./MainPage.module.scss";
import { TodoItems } from "./TodoItems";

export const MainPage = () => {
	const [tasksData, setTasksData] = useState<Todo[]>();
	const [tasksInfo, setTasksInfo] = useState<TodoInfo>();
	const [status, setStatus] = useState<TodoStatusTypes>("all");

	async function fetchData() {
		const data = await getTasks(status);
		if (data) {
			setTasksData(data.data);
			setTasksInfo(data.info);
		}
	}

	useEffect(() => {
		fetchData();
	}, [status]);

	return (
		<div className={styles.container}>
			<AddTask fetchData={fetchData} />
			<ChangeList tasks={tasksInfo} status={status} setStatus={setStatus} />
			<TodoItems tasks={tasksData} fetchData={fetchData} />
		</div>
	);
};
