import * as dao from './dao.js';

export default function PostRoutes(app) {
	app.post('/api/posts', async (req, res) => {
		const post = await dao.createPost(req.body);
		res.json(post);
	});

	app.get('/api/posts', async (req, res) => {
		const posts = await dao.findAllPosts();
		res.json(posts);
	});

	app.get('/api/posts/:postId', async (req, res) => {
		const post = await dao.findPostById(req.params.postId);
		res.json(post);
	});

	app.put('/api/posts/:postId', async (req, res) => {
		const status = await dao.updatePost(req.params.postId, req.body);
		res.json(status);
	});

	app.delete('/api/posts/:postId', async (req, res) => {
		const status = await dao.deletePost(req.params.postId);
		res.json(status);
	});
}
