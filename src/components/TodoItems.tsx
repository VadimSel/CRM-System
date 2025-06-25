
import { Todo } from "../types/todoTypes";
import { TodoItem } from "./TodoItem";

interface TodoItemsTypes {
	tasks?: Todo[];
	fetchData: () => void;
}

export const TodoItems = ({ tasks, fetchData }: TodoItemsTypes) => {
	return (
		<>
			{tasks?.map((el) => {
				return <TodoItem key={el.id} todo={el} fetchData={fetchData} />;
			})}
		</>
	);
};
