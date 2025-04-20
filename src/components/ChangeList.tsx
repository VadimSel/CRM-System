import { MetaResponse, StatusTypes, Todo, TodoInfo } from "../types";
import styles from './ChangeList.module.scss'

interface ChangeListTypes {
	status: StatusTypes
	setStatus: (value: StatusTypes) => void;
	tasks?: MetaResponse<Todo, TodoInfo>
};

export const ChangeList = ({ tasks, status, setStatus }: ChangeListTypes) => {
	const filters: { id: number; value: keyof TodoInfo; status: string }[] = [
		{
			id: 1,
			value: "all",
			status: "Все",
		},
		{
			id: 2,
			value: "inWork",
			status: "в работе",
		},
		{
			id: 3,
			value: "completed",
			status: "сделано",
		},
	];

	return (
		<div className={styles.filters}>
			{filters.map((el) => (
				<button
					key={el.id}
					className={el.id === status ? styles.active : ""}
					onClick={() => {
						setStatus(el.id as StatusTypes);
					}}
				>
					{el.status} ({tasks?.info && tasks.info[el.value]})
				</button>
			))}
		</div>
	);
};
