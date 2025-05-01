import { Todo } from "../types";

import { TodoItem } from "./TodoItem";

interface TodoItemsTypes {
	tasks?: Todo[];
	fetchData: () => void;
}

export const TodoItems = ({ tasks, fetchData }: TodoItemsTypes) => {
	return (
		<>
			{tasks?.map((el) => {
				return <TodoItem key={el.id} el={el} fetchData={fetchData} />;
			})}
		</>
	);
};
