import {
  createTopic,
  findAllTopics,
  deleteTopic,
  updateTopic,
  findTopicById,
} from "./dao.js";
export default function TopicRoutes(app) {

  app.post("/api/topics", async (req, res) => {
    //console.log(req.body);
    const topic = { ...req.body, _id: new Date().getTime().toString() };
    await createTopic(topic);
    res.send(topic);
  });

  app.get("/api/topics", async (req, res) => {
    // Get the search text from query parameters, defaulting to an empty string if not provided
    const searchText = req.query.searchText || '';
    try {
      // Pass the searchText to findAllTopics and send the result
      const topics = await findAllTopics(searchText);
  
      res.send(topics);
    } catch (error) {
      // Handle any errors that might occur during fetching topics
      res.status(500).send({ error: 'Failed to fetch topics' });
    }
  });
  
  app.delete("/api/topics/:id", async (req, res) => {
    const { id } = req.params;
    await deleteTopic(id);
    res.sendStatus(204);
  });

  app.put("/api/topics/:id", async (req, res) => {
    const { id } = req.params;
    const topic = req.body;
    await updateTopic(id, topic);
    res.sendStatus(204);
  });

  app.get("/api/topics/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const topic = await findTopicById(id);
    res.send(topic);
  });
}
