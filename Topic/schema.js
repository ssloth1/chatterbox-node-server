import mongoose from "mongoose";
const topicSchema = new mongoose.Schema(
	{
		//_id: String, mong db will create this automatically
		topicTitle: String,
		topicDesc: String,
	},
	{ collection: "topics" }
);

export default topicSchema;