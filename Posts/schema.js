import mongoose from "mongoose";
const commentsSchema = new mongoose.Schema(
	{
		//_id: String,mong db will create this automatically
		content: String,
		creator: String,
		// OPTIONAL: likes: Number,
		// OPTIONAL: commentDate: Date
	},
);
const postsSchema = new mongoose.Schema(
	{
		topicID: String,
		postTitle: String,
		postDesc: String,
		comments: [commentsSchema],
		postDate: Date,
		likes: Number,
		creator: String
	},
	{ collection: "posts" }
);

export default postsSchema;