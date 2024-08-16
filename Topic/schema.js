import mongoose from "mongoose";
const topicSchema = new mongoose.Schema(
  {
    _id: String,
    topicTitle: String,
    topicDesc: String,
  },
  { collection: "topics" }
);

export default topicSchema;
