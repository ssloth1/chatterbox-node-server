import mongoose from "mongoose";
const postsSchema = new mongoose.Schema(
  {
    _id: String,
    postTitle: String,
    postDesc: String,
    topic: String,
  },
  { collection: "posts" }
);

export default postsSchema;