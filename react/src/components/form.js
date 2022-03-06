import React, { useEffect } from "react";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");

const Form = ({
	inputText,
	setInputText,
	todos,
	setTodos,
	setStatus,
	filterHandler,
	status,
}) => {
	const inputTextHandler = (e) => {
		console.log(e.target.value);
		setInputText(e.target.value);
	};

	const submitTodoHandler = async (e) => {
		e.preventDefault();
		setTodos([
			...todos,
			{
				todo: inputText,
				completed: 0,
				usernameId: "5034bf48-6f37-434e-9d99-9e9d936e9336",
				id: uuidv4(),
			},
		]);
		setInputText("");
	};

	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	useEffect(() => {
		filterHandler();
	}, [status, todos]);
	return (
		<form>
			<input
				value={inputText}
				onChange={inputTextHandler}
				type="text"
				className="todo-input"
			/>
			<button onClick={submitTodoHandler} className="todo-button" type="submit">
				<i className="fas fa-plus-square"></i>
			</button>
			<div className="select">
				<select onChange={statusHandler} name="todos" className="filter-todo">
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">Uncompleted</option>
				</select>
			</div>
		</form>
	);
};

export default Form;
