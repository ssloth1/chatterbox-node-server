import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: String,
	lastName: String,
	email: { type: String, required: true, unique: true },
	phone: String,
	dob: Date,
	role: {
		type: String,
		enum: ["STAFF", "USER", "MODERATOR"],
		default: "USER",
	},
}, { collection: "users" });

export default userSchema;