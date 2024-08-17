import {
	createPost,
	findAllPosts,
	deletePost,
	updatePost,
	//findPostById,
} from "./dao.js";
export default function TopicRoutes(app) {
	app.post("/api/posts", async (req, res) => {
		const post = { ...req.body, _id: new Date().getTime().toString() };
		await createPost(post);
		res.send(post);
	});

	app.get("/api/posts", async (req, res) => {
		// Get the search text from query parameters, defaulting to an empty string if not provided
		const posts = await findAllPosts();
		console.log(posts)
		res.json(posts);
	});

	app.delete("/api/posts/:pid", async (req, res) => {
		await deletePost(req.params.pid);
		res.sendStatus(204);
	});

	app.put("/api/posts/:pid", async (req, res) => {
		const post = await updatePost(req.params.id, req.body);
		res.json(post);
	});

}