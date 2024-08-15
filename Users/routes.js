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
		const { username, password } = req.body;
		const currentUser = await dao.findUserByCredentials(username, password);
		if (currentUser) {
			req.session["currentUser"] = currentUser;
			//console.log("UserRoutes.signin: currentUser:", currentUser);
			res.json(currentUser);
		} else {
			res.status(401).json({ message: "Unable to login. Try again later." });
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
		//console.log("UserRoutes.signup: currentUser:", currentUser);
		req.session["currentUser"] = currentUser;
		res.json(currentUser);
	};
	app.post("/api/users/signup", signup);

	// profile
	const profile = (req, res) => {
		const currentUser = req.session["currentUser"];
		if (!currentUser) {
			res.sendStatus(401);
			return;
		}
		res.json(currentUser);
	};
	app.post("/api/users/profile", profile);

	const signout = (req, res) => {
		currentUser = null;
		res.sendStatus(200);
	};
	app.post("/api/users/signout", signout);
}
