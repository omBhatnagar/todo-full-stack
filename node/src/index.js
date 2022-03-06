const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

// Disable cross origin resource sharing when development was done.
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.use((error, req, res, next) => {
	console.log(error);
	return res.status(error.httpStatusCode).send({
		code: error.httpStatusCode,
		message: error.message,
	});
});

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Port
const PORT = process.env.PORT || 3200;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
