import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	postID: { type: mongoose.Schema.Types.ObjectId, ref: 'PostModel', required: true },
	content: { type: String, required: true },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
	commentDate: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
}, { collection: 'comments' });

export default commentSchema;
