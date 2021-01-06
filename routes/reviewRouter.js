const router = require("express").Router()
const { getAllReviews, getOneReview, updateReview, deleteReview, createReview } = require("../controllers/reviewController")

router.route('/').get(getAllReviews).post(createReview)
router.route('/:id').get(getOneReview).patch(updateReview).delete(deleteReview)

module.exports = router;