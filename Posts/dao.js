import PostsModel from "./model.js";

export const createPost = (post) => PostsModel.create(post);
export const findAllPosts = () => PostsModel.find();
export const findPostById = (id) => PostsModel.findById(id);
export const updatePost = (id, post) => PostsModel.findByIdAndUpdate(id, post, { new: true });
export const deletePost = (id) => PostsModel.findByIdAndDelete(id);