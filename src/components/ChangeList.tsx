import { TodoInfo, TodoStatusTypes } from "../types";
import styles from './ChangeList.module.scss';

interface ChangeListTypes {
	status: TodoStatusTypes
	setStatus: (value: TodoStatusTypes) => void;
	tasks?: TodoInfo
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
					className={el.value === status ? styles.active : ""}
					onClick={() => {
						setStatus(el.value as TodoStatusTypes);
					}}
				>
					{el.status} ({tasks && tasks[el.value]})
				</button>
			))}
		</div>
	);
};
