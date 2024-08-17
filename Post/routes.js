import { createPost, updatePost, deletePost, findPostforTopic, findPostById } from "./dao.js";
export default function PostRoutes(app) {
  app.get("/api/topics/:tid/posts", async (req, res) => {
    const { tid } = req.params; // Get topic ID from URL parameters
    const { search } = req.query; // Get search string from query parameters

    try {
      // If no search string is provided, search will be undefined, and the function will still work
      const posts = await findPostforTopic(tid, search);
      res.json(posts);
    } catch (error) {
      // Handle errors, such as issues with the database connection
      console.error("Failed to fetch posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/topics/:tid/post", async (req, res) => {
    const { tid } = req.params;
    const post = {
      ...req.body,
      topic: tid,
      _id: new Date().getTime().toString(),
    };
    await createPost(post);
    res.json(post);
  });

  app.delete("/api/posts/:pid", async (req, res) => {
    const { pid } = req.params;
    await deletePost(pid);
    res.sendStatus(200);
  });
  app.put("/api/posts/:pid", async (req, res) => {
    const { pid } = req.params;
    const post = req.body;
    await updatePost(pid, post);
    res.sendStatus(204);
  });
  app.get("/api/posts/:pid", async (req, res) => {
    const { pid } = req.params;
    console.log(pid);

    const post = await findPostById(pid);
    res.send(post);
  });
}
