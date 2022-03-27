import express from 'express';
import RestaurantsCtrl from './restaurants.controller.js';
import ReviewsCtrl from './reviews.controller.js';
const router = express.Router();

router.get('/', RestaurantsCtrl.apiGetRestaurants);
router.get('/id/:id', RestaurantsCtrl.apiGetRestaurantById);
router.get('/cuisines', RestaurantsCtrl.apiGetRestaurantCuisines);

router
	.route('/review')
	.post(ReviewsCtrl.apiPostReview)
	.put(ReviewsCtrl.apiUpdateReview)
	.delete(ReviewsCtrl.apiDeleteReview);

export default router;
