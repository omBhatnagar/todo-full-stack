import React, { useEffect } from "react";
import axios from "axios";

// Import comps
import Todo from "./todo";

const TodoList = ({ todos, setTodos, filteredTodos, filterHandler }) => {
	const postChanges = async () => {
		console.log("postChanges called");
		const stuff = { data: todos };
		const response = await axios.post(
			"http://localhost:3200/api/todos/add-todo",
			stuff
		);
	};

	useEffect(() => {
		postChanges();
	}, [todos]);
	return (
		<div className="todo-container">
			<ul className="todo-list">
				{filteredTodos.map((filteredTodo) => (
					<Todo
						setTodos={setTodos}
						todos={todos}
						filteredTodo={filteredTodo}
						key={filteredTodo.id}
						filterHandler={filterHandler}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
