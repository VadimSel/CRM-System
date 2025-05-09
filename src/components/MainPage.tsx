import { useEffect, useState } from "react";
import { getTasks } from "../api";
import { Todo, TodoInfo, TodoStatusTypes } from "../types";
import { AddTask } from "./AddTask";
import { ChangeList } from "./ChangeList";
import styles from "./MainPage.module.scss";
import { TodoItems } from "./TodoItems";
import { SideBar } from "./SideBar";

export const MainPage = () => {
	const [tasksData, setTasksData] = useState<Todo[]>();
	const [tasksInfo, setTasksInfo] = useState<TodoInfo>();
	const [status, setStatus] = useState<TodoStatusTypes>("all");

	async function fetchData() {
		try {
			const data = await getTasks(status);
			if (data) {
				setTasksData(data.data);
				setTasksInfo(data.info);
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
			<SideBar/>
			<AddTask fetchData={fetchData} />
			<ChangeList tasks={tasksInfo} status={status} setStatus={setStatus} />
			<TodoItems tasks={tasksData} fetchData={fetchData} />
		</div>
	);
};
