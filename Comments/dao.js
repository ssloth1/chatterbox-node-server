// chatterbox-node-server/Comments/dao.js
import model from './model.js';

export const createComment = (comment) => model.create(comment);
export const findAllComments = () => model.find();
export const findCommentById = (commentId) => model.findById(commentId);
export const updateComment = (commentId, comment) => model.updateOne({ _id: commentId }, { $set: comment });
export const deleteComment = (commentId) => model.deleteOne({ _id: commentId });
