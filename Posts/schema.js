import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	topicID: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
	postTitle: { type: String, required: true },
	postDesc: { type: String, required: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
	postDate: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
}, { collection: 'posts' });

export default postSchema;
