import { useEffect, useState } from "react";
import { getTasks } from "../api";
import { Todo, TodoFilterEnum, TodoInfo } from "../types";
import { AddTask } from "./AddTask";
import { ChangeList } from "./ChangeList";
import styles from "./MainPage.module.scss";
import { TodoItems } from "./TodoItems";

export const MainPage = () => {
	const [tasksData, setTasksData] = useState<Todo[]>();
	const [filtersInfo, setFiltersInfo] = useState<TodoInfo>();
	const [status, setStatus] = useState<TodoFilterEnum>(TodoFilterEnum.all);

	async function fetchData() {
		try {
			const data = await getTasks(status);
			if (data) {
				setTasksData(data.data);
				setFiltersInfo(data.info);
			}
		} catch (error) {
			window.alert(error)
		}
	}

	useEffect(() => {
		fetchData();
		const getData = setInterval(() => fetchData(), 5000)
		return () => clearInterval(getData)
	}, [status]);

	return (
		<div className={styles.container}>
			<AddTask fetchData={fetchData} />
			<ChangeList filtersInfo={filtersInfo} status={status} setStatus={setStatus} />
			<TodoItems tasks={tasksData} fetchData={fetchData} />
		</div>
	);
};
