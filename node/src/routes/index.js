const router = require("express").Router();

// Routes
const auth = require("./auth");
const todo = require("./todo");

router.use("/auth", auth);

router.use("/todos", todo);

module.exports = router;
