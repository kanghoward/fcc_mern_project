import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId; // ^converts string into obj id

let reviews;

export default class ReviewsDAO {
	static async injectDB(conn) {
		if (reviews) {
			return;
		}
		try {
			reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews'); //^creates reviews collection if it doesnt exist
		} catch (error) {
			console.error(`Unable to establish connection handles in userDAO: ${error}`);
		}
	}

	static async addReview(restaurantId, user, review, date) {
		try {
			const reviewDoc = {
				name: user.name,
				user_id: user._id,
				date: date,
				text: review,
				restaurantId: ObjectId(restaurantId)
			};
			return await reviews.insertOne(reviewDoc);
		} catch (error) {
			console.error(`Unable to post review: ${error}`);
			return { error: error };
		}
	}

	static async updateReview(reviewId, userId, text, date) {
		try {
			const updateResponse = await reviews.updateOne(
				{ user_id: userId, _id: ObjectId(reviewId) },
				{ $set: { text: text, date: date } }
			);

			return updateResponse;
		} catch (error) {
			console.error(`Unable to update review: ${error}`);
			return { error: error };
		}
	}

	static async deleteReview(reviewId, userId) {
		try {
			const deleteResponse = await reviews.deleteOne({
				_id: ObjectId(reviewId),
				user_id: userId
			});
			return deleteResponse;
		} catch (error) {
			console.error(`Unable to delete review: ${error}`);
			return { error: error };
		}
	}
}
