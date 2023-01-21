const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../Model/user.model");
const userController = express.Router();

//getting logged in user data

userController.get("/:id", async (req, res) => {
	const user = await UserModel.findById({ _id: req.params.id });
	// console.log(user);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(401).send("User not Found");
	}
});

// sign up / register user

userController.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const userPresent = await UserModel.findOne({ email });

	if (userPresent) {
		return res.send("User Already Exists");
	}
	bcrypt.hash(password, 5, async (err, hash) => {
		if (err) {
			return res.send("Something went wrong");
		}
		const user = new UserModel({
			name,
			email,
			password: hash,
		});
		try {
			await user.save();
			return res.send("Sign-Up successful");
		} catch (error) {
			return res.send("Something went Wrong");
		}
	});
});

//login user

userController.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	const hash = user ? user.password : undefined;
	bcrypt.compare(password, hash, (error, result) => {
		if (error) {
			return res.send("Please Sign Up");
		}
		if (result) {
			const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
			return res.send({
				message: "Logged in Successful",
				token: token,
				id: user._id,
			});
		} else {
			return res.send("Something Went Wrong, Credentials are Wrong");
		}
	});
});

module.exports = { userController };
