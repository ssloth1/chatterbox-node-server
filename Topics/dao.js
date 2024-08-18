// chatterbox-node-server/Topics/dao.js

import model from "./model.js";

export const createTopic = (topic) => model.create(topic);
export const findAllTopics = async (searchString = "") => {
  try {
    let query = {};
    if (searchString) {
      query.$or = [
        { topicTitle: { $regex: searchString, $options: "i" } },
        { topicDesc: { $regex: searchString, $options: "i" } },
      ];
    }
    const topics = await model.find(query);
    return topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};
export const findTopicById = (topicId) => model.findById(topicId);
export const updateTopic = (topicId, topic) =>
  model.updateOne({ _id: topicId }, { $set: topic });
export const deleteTopic = (topicId) => model.deleteOne({ _id: topicId });
