const router = require("express").Router()
const { getAllReviews, getOneReview, updateReview, deleteReview, createReview } = require("../controllers/reviewController")
const { isLoggedIn } = require("./../middlewares/middlewares")

router.route('/').get(getAllReviews).post(isLoggedIn, createReview)
router.route('/:id').get(getOneReview).patch(updateReview).delete(deleteReview)

module.exports = router;