const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: { type: "string", required: false },
		email: { type: "string", required: true },
		password: { type: "string", required: true },
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
