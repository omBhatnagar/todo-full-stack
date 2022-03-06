import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";

// Importing comps
import Form from "./components/form";
import TodoList from "./components/todo-list";
import Login from "./components/login";

function App() {
	// Initializing States
	const [loginStatus, setLoginStatus] = useState(false);
	const [usernameId, setUsernameId] = useState("");
	const [userName, setUsername] = useState("");
	const [accessToken, setAccessToken] = useState("");

	// Check if logged in or not
	useEffect(() => {});
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						loginStatus ? (
							<Home
								loginStatus={loginStatus}
								setLoginStatus={setLoginStatus}
								usernameId={usernameId}
								userName={userName}
								accessToken={accessToken}
							/>
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/login"
					element={
						<Login
							setLoginStatus={setLoginStatus}
							setUsernameId={setUsernameId}
							setUsername={setUsername}
							setAccessToken={setAccessToken}
							loginStatus={loginStatus}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

const Home = ({ loginStatus, setLoginStatus, usernameId, userName }) => {
	// State stuff
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("All");
	const [filteredTodos, setFilteredTodos] = useState([]);

	// Functions
	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilteredTodos(todos.filter((todo) => todo.completed == 1));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter((todo) => todo.completed == 0));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};

	const postStuff = async () => {};
	const getStuff = async () => {
		const stuff = await fetch("http://localhost:3200/api/todos");
		const data = await stuff.json();
		console.log("data", data.data);
		setTodos(data.data);
		filterHandler();
	};

	// UseEffect
	useEffect(() => {
		getStuff();
	}, []);
	return (
		<div className="App">
			<header>
				<h1>{userName}'s to-do list!</h1>
			</header>
			<Form
				inputText={inputText}
				setInputText={setInputText}
				todos={todos}
				setTodos={setTodos}
				setStatus={setStatus}
				filterHandler={filterHandler}
				status={status}
			/>
			<TodoList
				setTodos={setTodos}
				todos={todos}
				filteredTodos={filteredTodos}
				filterHandler={filterHandler}
			/>
		</div>
	);
};

export default App;
