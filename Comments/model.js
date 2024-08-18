// chatterbox-node-server/Comments/model.js
import mongoose from 'mongoose';
import schema from './schema.js';

const model = mongoose.model('CommentModel', schema);
export default model;
