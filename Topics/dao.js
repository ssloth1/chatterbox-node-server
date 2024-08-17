// chatterbox-node-server/Topics/dao.js

import model from "./model.js";

export const createTopic = (topic) => model.creater(topic);
export const findAllTopics = () => model.find();
export const findTopicById = (topicId) => model.findById(topicId);
export const updateTopic = (topicId, topic) => model.updateOne({ _id: topicId }, { $set: topic });
export const deleteTopic = (topicId) => model.deleteOne({ _id: topicId });