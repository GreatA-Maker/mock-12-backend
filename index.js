const express = require("express");
require("dotenv").config();
const cors = require("cors");

//importing db connection and user controller
const { connection } = require("./Config/db");
const { userController } = require("./Routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

//user controller routes
app.use("/user", userController);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
	try {
		await connection;
		console.log(`Listening on Port ${PORT}`);
	} catch (error) {
		console.log("Connection Failed, Not able to connect ot DB");
		console.log(error.message);
	}
});
