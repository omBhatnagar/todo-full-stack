const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../database/models");
const { DatabaseError } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (req, res, next) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) {
			throw new Error("Username or password can not be empty!");
		}

		const user = await users.findAll({ where: { username } });
		if (user.length >= 1) {
			const isValid = await bcrypt.compare(password, user[0].password);
			if (isValid) {
				const token = await jwt.sign(
					{
						username,
						id: user[0].id,
					},
					process.env.USER_JWT_SECRET
				);

				res.status(200).send({
					code: 200,
					status: true,
					message: "Logged in.",
					data: {
						username,
						userId: user[0].id,
						accessToken: token,
					},
				});
			} else {
				return res.status(400).send({
					code: 400,
					status: false,
					message: "Incorrect username or password!",
				});
			}
		} else {
			throw new Error("User does not exists!");
		}
	} catch (err) {
		if (err instanceof DatabaseError) {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		} else {
			const error = new Error(err);
			error.httpStatusCode = 400;
			return next(error);
		}
	}
});

router.post("/register", async (req, res, next) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			throw new Error("Username or password cannot be empty!");
		}

		const exists = await users.findAll({ where: { username } });
		if (exists.length >= 1) {
			throw new Error("Username already exists!");
		}
		const hashedPass = await bcrypt.hash(password, 10);
		const response = await users.create({
			username,
			password: hashedPass,
			id: uuidv4(),
		});

		const token = await jwt.sign(
			{
				username,
				id: user[0].id,
			},
			process.env.USER_JWT_SECRET
		);

		return res.status(200).send({
			code: 200,
			status: true,
			message: "User created successfully",
			data: {
				accessToken: token,
				username,
			},
		});
	} catch (err) {
		if (err instanceof DatabaseError) {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		} else {
			const error = new Error(err);
			error.httpStatusCode = 400;
			return next(error);
		}
	}
});

module.exports = router;
