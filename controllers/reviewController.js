

const Product = require("./../models/Products")
const Review = require("./../models/Reviews")
const dateFormat = require("dateformat")
const catchAsync = require("./../utils/catchAsync")

// exports.getAllReviews = (req, res) => {
//     res.send("get all reviews route!")
// }
// exports.getOneReview = (req, res) => {
//     res.send("get one review route!")
// }
// exports.updateReview = (req, res) => {
//     res.send("update review route!")
// }
exports.createReview = catchAsync(async (req, res) => {
    const product = await Product.find({_id: req.params.id})
    const newReview = {
        name: req.user.name,
        content: req.body.review,
        location: req.user.location,
        date: dateFormat(Date.now(), 'paddedShortDate')
    }
    const review = await Review.create(newReview)
    product[0].reviews.push(newReview)
    await product[0].save()
    res.status(200).json({
        "status":"success",
        "message":"Reviews submitted successfully"
    })
})
// exports.deleteReview = (req, res) => {
//     res.send("delete review route!")
// }