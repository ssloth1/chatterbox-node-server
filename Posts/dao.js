// chatterbox-node-server/Posts/dao.js
import model from './model.js';

export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();
export const findPostById = (postId) => model.findById(postId);
export const updatePost = (postId, post) => model.updateOne({ _id: postId }, { $set: post });
export const deletePost = (postId) => model.deleteOne({ _id: postId });
export const findPostforTopic = (topicId, searchString) => {
    const searchRegex = new RegExp(searchString, 'i');  
    return model.find({
      topic: topicId,
      $or: [
        { postTitle: { $regex: searchRegex } },
        { postDesc: { $regex: searchRegex } }
      ]
    });
  };
  