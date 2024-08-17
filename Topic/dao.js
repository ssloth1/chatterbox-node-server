import model from "./model.js";
import pkg from 'mongodb';
const { ObjectId } = pkg;

export const createTopic = (topic) => {
	return model.create(topic);
}

export const findAllTopics = async (searchString = '') => {
	try {
		let query = {}; // Initialize an empty query object

		// If searchString is provided, configure the query to search in 'topicTitle' and 'topicDesc'
		if (searchString) {
			query.$or = [
				{ topicTitle: { $regex: searchString, $options: 'i' } }, // Case-insensitive search for title
				{ topicDesc: { $regex: searchString, $options: 'i' } }   // Case-insensitive search for description
			];
		}

		const topics = await model.find(query); // Execute the query with or without the search condition

		return topics; // Return the topics, already filtered by the database if searchString was provided
	} catch (error) {
		console.error('Error fetching topics:', error);
		throw error; // Re-throw or handle accordingly
	}
};






export const findTopicById = (topicId) => model.findOne({ _id: topicId });

export const updateTopic = (topicId, topic) => model.updateOne({ _id: topicId }, { $set: topic });

export const deleteTopic = (topicId) => model.deleteOne({ _id: topicId });

export const findTopicNumber = (topicId) => model.findById(topicId).select('number');