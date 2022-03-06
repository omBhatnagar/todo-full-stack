const { uuid } = require("uuidv4");
const passport = require("../utils/passport");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { todos } = require("../database/models");
const jwt_decode = require("jwt-decode");
const { DatabaseError } = require("sequelize");

router.get(
	"/",
	// passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			// const token = req.headers.authorization.split(" ")[1];
			// const { username, id } = jwt_decode(token);

			const theStuff = await todos.findAll({
				where: {
					usernameId: "5034bf48-6f37-434e-9d99-9e9d936e9336",
				},
				attributes: ["todo", "completed", "usernameId", "id"],
			});

			return res.status(200).send({
				code: 200,
				status: true,
				data: theStuff,
			});
		} catch (err) {
			if (err instanceof DatabaseError) {
				err.httpStatusCode = 500;
				return next(err);
			}
			err.httpStatusCode = 400;
			return next(err);
		}
	}
);

router.post(
	"/add-todo",
	// passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		// const { todo, completed, id } = req.body;
		const { data } = req.body;
		// const token = req.headers.authorization.split(" ")[1];
		// const { id } = jwt_decode(token);

		try {
			stuff = await Promise.all(
				data.map(async ({ todo, completed }) => {
					if (!todo) {
						throw new Error("Todo text cannot be empty!");
					}

					const isThere = await todos.findAll({ where: { todo } });
					if (isThere.length >= 1) {
						const update = await todos.update(
							{
								todo,
								completed,
							},
							{
								where: {
									id: isThere[0].id,
								},
							}
						);
						return;
					}

					const add = await todos.create({
						todo,
						usernameId: "5034bf48-6f37-434e-9d99-9e9d936e9336",
						completed: 0,
						id: uuidv4(),
					});
					return;
				})
			);

			return res.status(201).send({
				code: 201,
				status: true,
				message: "Successful",
			});
		} catch (err) {
			if (err instanceof DatabaseError) {
				err.httpStatusCode = 500;
				return next(err);
			}
			err.httpStatusCode = 400;
			return next(err);
		}
	}
);

router.put(
	"/update-todo",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		const { id } = req.body;
		try {
			if (!id) {
				throw new Error("Todo Id cannot be empty!");
			}

			const response = await todos.update(
				{
					completed: 1,
				},
				{
					where: {
						id,
					},
				}
			);

			return res.status(201).send({
				code: 201,
				status: true,
				message: "Marked as completed!",
			});
		} catch (err) {
			if (err instanceof DatabaseError) {
				err.httpStatusCode = 500;
				return next(err);
			}
			err.httpStatusCode = 400;
			return next(err);
		}
	}
);

router.delete(
	"/delete-todo/:id",
	// passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		const { id } = req.params;
		console.log(req.params);
		try {
			if (!id) {
				throw new Error("Todo id cannot be empty!");
			}

			const response = await todos.destroy({
				where: {
					id,
				},
			});

			return res.status(201).send({
				code: 201,
				status: true,
				message: "Todo deleted successfully.",
			});
		} catch (err) {
			if (err instanceof DatabaseError) {
				err.httpStatusCode = 500;
				return next(err);
			}
			err.httpStatusCode = 400;
			return next(err);
		}
	}
);

module.exports = router;
