import React, { useEffect } from "react";
import axios from "axios";

const Todo = ({ filteredTodo, setTodos, todos, filterHandler }) => {
	const deleteHandler = async () => {
		setTodos(todos.filter((el) => el.id !== filteredTodo.id));
		const response = await axios.delete(
			`http://localhost:3200/api/todos/delete-todo/${filteredTodo.id}`
		);
	};
	const completeHandler = async () => {
		setTodos(
			todos.map((item) => {
				if (item.id === filteredTodo.id) {
					return {
						...item,
						completed: item.completed > 0 ? 0 : 1,
					};
				}
				return item;
			})
		);
	};

	useEffect(() => {
		filterHandler();
	}, [todos]);
	return (
		<div className="todo">
			<li
				className={`todo-item ${
					filteredTodo.completed == 1 ? "completed" : ""
				}`}
			>
				{filteredTodo.todo}
			</li>
			<button onClick={completeHandler} className="complete-btn">
				<i className="fas fa-check"></i>
			</button>
			<button onClick={deleteHandler} className="trash-btn">
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
};

export default Todo;
