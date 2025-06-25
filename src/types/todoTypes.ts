export interface TodoRequest {
	title?: string;
	isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
	id: number;
	title: string;
	created: string;
	isDone: boolean;
}

export interface TodoInfo {
	all: number;
	completed: number;
	inWork: number;
}

export interface MetaResponse<T, N> {
	data: T[];
	info?: N;
	meta: {
		totalAmount: number;
	};
}

export interface Task {
	created: string;
	id: number;
	isDone: boolean;
	title: string;
}

export enum TodoFilterEnum {
	all = "all",
	inWork = "inWork",
	completed = "completed",
}