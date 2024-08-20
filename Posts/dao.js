import model from "./model.js";

export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();

export const findPostforTopic = (topicId, search) => {
	if (search) {

		return model.find({
			topicID: topicId,
			$or: [
				{ postTitle: { $regex: search, $options: "i" } },
				{ postDesc: { $regex: search, $options: "i" } }
			]
		});
	} else {
		return model.find({ topicID: topicId });
	}
};

export const findPostById = (postId) => model.findById(postId);
export const updatePost = (postId, post) => model.updateOne({ _id: postId }, { $set: post });
export const deletePost = (postId) => model.deleteOne({ _id: postId });
