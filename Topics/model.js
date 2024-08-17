import mongoose from 'mongoose';
import schema from './schema.js';

const model = mongoose.model('TopicModel', schema);
export default model;
