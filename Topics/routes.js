// chatterbox-node-server/src/Topics/routes.js

import * as dao from './dao.js';

export default function TopicRoutes(app) {
	app.post('/api/topics', async (req, res) => {
		const topic = await dao.createTopic(req.body);
		res.json(topic);
	});

	app.get('/api/topics', async (req, res) => {
		const topics = await dao.findAllTopics();
		res.json(topics);
	});

	app.get('/api/topics/:topicId', async (req, res) => {
		const topic = await dao.findTopicById(req.params.topicId);
		res.json(topic);
	});

	app.put('/api/topics/:topicId', async (req, res) => {
		const status = await dao.updateTopic(req.params.topicId, req.body);
		res.json(status);
	});

	app.delete('/api/topics/:topicId', async (req, res) => {
		const status = await dao.deleteTopic(req.params.topicId);
		res.json(status);
	});
}
