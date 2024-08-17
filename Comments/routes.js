import * as dao from './dao.js';

export default function CommentRoutes(app) {

	// Create Comment
	app.post('/api/comments', async (req, res) => {
		const comment = await dao.createComment(req.body);
		res.json(comment);
	});

	// Get All Comments
	app.get('/api/comments', async (req, res) => {
		const comments = await dao.findAllComments();
		res.json(comments);
	});

	// Get Comment by ID
	app.get('/api/comments/:commentId', async (req, res) => {
		const comment = await dao.findCommentById(req.params.commentId);
		res.json(comment);
	});

	// Update Comment
	app.put('/api/comments/:commentId', async (req, res) => {
		const status = await dao.updateComment(req.params.commentId, req.body);
		res.json(status);
	});

	// Delete Comment
	app.delete('/api/comments/:commentId', async (req, res) => {
		const status = await dao.deleteComment(req.params.commentId);
		res.json(status);
	});
}
