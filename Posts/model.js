import mongoose from 'mongoose';
import schema from './schema.js';

const model = mongoose.model('Post', schema);
export default model;
