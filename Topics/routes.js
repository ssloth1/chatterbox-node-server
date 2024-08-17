import * as dao from './dao.js';

export default function TopicRoutes(app) {

	// Create Topic
	app.post('/api/topics', async (req, res) => {
		const topic = await dao.createTopic(req.body);
		res.json(topic);
	});

	// Get All Topics
	app.get('/api/topics', async (req, res) => {
		const topics = await dao.findAllTopics();
		res.json(topics);
	});

	// Get Topic by ID
	app.get('/api/topics/:topicId', async (req, res) => {
		const topic = await dao.findTopicById(req.params.topicId);
		res.json(topic);
	});

	// Update Topic
	app.put('/api/topics/:topicId', async (req, res) => {
		const status = await dao.updateTopic(req.params.topicId, req.body);
		res.json(status);
	});

	// Delete Topic
	app.delete('/api/topics/:topicId', async (req, res) => {
		const status = await dao.deleteTopic(req.params.topicId);
		res.json(status);
	});
}
