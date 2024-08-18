import * as dao from './dao.js';

let currentUser = null;

export default function UserRoutes(app) {


	// create user
	const createUser = async (req, res) => {
		const user = await dao.createUser(req.body);
		//console.log("UserRoutes.createUser: user:", user);
		res.json(user);
	};
	app.post("/api/users", createUser);

	// delete user
	const deleteUser = async (req, res) => {
		const status = await dao.deleteUser(req.params.userId);
		//console.log("UserRoutes.deleteUser: status:", status);
		res.json(status);
	};
	app.delete("/api/users/:userId", deleteUser);

	// find all users
	const findAllUsers = async (req, res) => {
		const { role } = req.query;
		if (role) {
			const users = await dao.findUsersByRole(role);
			//console.log("UserRoutes.findAllUsers: users:", users);
			res.json(users);
			return;
		}
		if (name) {
			const users = await dao.findUsersByPartialName(name);
			//console.log("UserRoutes.findAllUsers: users:", users);
			res.json(users);
			return;
		}
		const users = await dao.findAllUsers();
		res.json(users);
	};
	app.get("/api/users", findAllUsers);

	// find user by id
	const findUserById = async (req, res) => {
		const user = await dao.findUserById(req.params.userId);
		//console.log("UserRoutes.findUserById: user:", user);
		res.json(user);
	};
	app.get("/api/users/:userId", findUserById);

	// update user
	const updateUser = async (req, res) => {
		const { userId } = req.params;
		const status = await dao.updateUser(userId, req.body);
		//console.log("UserRoutes.updateUser: status:", status);
		res.json(status);
	};
	app.put("/api/users/:userId", updateUser);

	// signin
	const signin = async (req, res) => {
		const { identifier, password } = req.body; // uses 'identifier' for email or username sign ins
		console.log("Attempting to sign in with identifier:", identifier, "password:", password);

		const currentUser = await dao.findUserByCredentials(identifier, password);
		console.log("UserRoutes.signin: currentUser:", currentUser);

		if (currentUser) {
			req.session["currentUser"] = currentUser;
			res.json(currentUser);
		} else {
			res.status(401).json({ message: "Invalid credentials." });
		}
	};

	app.post("/api/users/signin", signin);


	// signup
	const signup = async (req, res) => {
		const user = await dao.findUserByUsername(req.body.username);
		if (user) {
			res.status(400).json({ message: "Username already taken" });
			return;
		}
		const currentUser = await dao.createUser(req.body);
		console.log("UserRoutes.signup: currentUser:", currentUser);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	app.post("/api/users/signup", signup);

	// profile, get the current user profile/details
	const profile = async (req, res) => {
		const sessionUser = req.session["currentUser"];
		if (!sessionUser) {
			return res.sendStatus(401);
		}

		try {
			const user = await dao.findUserById(sessionUser._id);
			if (!user) {
				return res.sendStatus(404);
			}
			res.json(user);
		} catch (err) {
			console.error("Error fetching profile:", err);
			res.sendStatus(500);
		}
	};
	app.post("/api/users/profile", profile);


	// Create anonymous user
	const createAnonymousUser = async (req, res) => {
		try {
			const guestUser = await dao.createAnonymousUser();
			req.session["currentUser"] = guestUser;
			res.json(guestUser);
		} catch (err) {
			console.error("Error creating anonymous user:", err);
			res.sendStatus(500);
		}
	};
	app.post("/api/users/anonymous", createAnonymousUser);


	const signout = (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				return res.status(500).json({ message: "Failed to sign out." });
			}
			res.status(200).json({ message: "Signed out successfully." });
		});
	};
	app.post("/api/users/signout", signout);
}


