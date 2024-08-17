import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
}, { collection: 'topics' });

export default topicSchema;
