import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({
	setLoginStatus,
	setUsername,
	setUsernameId,
	setAccessToken,
	loginStatus,
}) => {
	// initializing states
	const [usernameText, setUsernameText] = useState("");
	const [password, setPassword] = useState("");

	// Navigate
	let navigate = useNavigate();

	// functions
	const updateUsernameText = (e) => {
		setUsernameText(e.target.value);
	};
	const updatePasswordText = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = { username: usernameText, password: password };
		const response = await axios.post(
			"http://localhost:3200/api/auth/login",
			data
		);
		console.log(response);
		setUsername(response.data.data.username);
		setAccessToken(response.data.data.accessToken);
		setUsernameId(response.data.data.userId);
		setLoginStatus(true);
		navigate("/");
	};

	// Redirect to Home
	// useEffect(() => {
	// 	console.log("useEffect run");
	// 	console.log(loginStatus);
	// 	if (loginStatus) {
	// 		return <Navigate to="/" />;
	// 	}
	// }, [loginStatus]);

	return (
		<div className="wrapper">
			<form>
				<label>Username</label>
				<input type="text" value={usernameText} onChange={updateUsernameText} />
				<br />
				<label>Password</label>
				<input type="password" value={password} onChange={updatePasswordText} />
				<button type="submit" onClick={handleSubmit}>
					Log in!
				</button>
			</form>
		</div>
	);
};

export default Login;
