import model from "./model.js";


export const createUser = (user) => {
	delete user._id
	return model.create(user);
}

export const findUsersByPartialName = (partialName) => {
	const regex = new RegExp(partialName, "i");
	return model.find({
		$or: [{ firstName: { $regex: regex } },
		{ lastName: { $regex: regex } }],
	});
};

export const findUserByCredentials = async (identifier, password) => {
	// Try finding the user by username or email
	const user = await model.findOne({
		$or: [{ username: identifier }, { email: identifier }],
	});

	// Check if the user exists and the password matches
	if (user && user.password === password) {
		return user;
	}

	return null;
};

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });