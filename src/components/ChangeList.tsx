import { Button } from "antd";
import styles from "./ChangeList.module.scss";
import { TodoFilterEnum, TodoInfo } from "../types/todoTypes";

interface ChangeListTypes {
	status: TodoFilterEnum;
	setStatus: (value: TodoFilterEnum) => void;
	filtersInfo?: TodoInfo;
}

export const ChangeList = ({ filtersInfo, status, setStatus }: ChangeListTypes) => {
	const filters: { id: number; value: TodoFilterEnum; status: string }[] = [
		{
			id: 1,
			value: TodoFilterEnum.all,
			status: "Все",
		},
		{
			id: 2,
			value: TodoFilterEnum.inWork,
			status: "в работе",
		},
		{
			id: 3,
			value: TodoFilterEnum.completed,
			status: "сделано",
		},
	];

	return (
		<div className={styles.filters}>
			{filters.map((el) => (
				<Button
					key={el.id}
					type={el.value === status ? "default" : "text"}
					onClick={() => {
						setStatus(el.value);
					}}
				>
					{el.status} ({filtersInfo && filtersInfo[el.value]})
				</Button>
			))}
		</div>
	);
};
