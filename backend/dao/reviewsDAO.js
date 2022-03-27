let reviews;

export default class ReviewsDAO {
	static async injectDb(conn) {
		if (reviews) {
			return;
		}
		try {
			reviews = await conn.db(process.env.REST);
		} catch (error) {}
	}
}
