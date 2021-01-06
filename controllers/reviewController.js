

const Product = require("./../models/Products")
const Review = require("./../models/Reviews")

exports.getAllReviews = (req, res) => {
    res.send("get all reviews route!")
}
exports.getOneReview = (req, res) => {
    res.send("get one review route!")
}
exports.updateReview = (req, res) => {
    res.send("update review route!")
}
exports.createReview = async (req, res) => {
    const product = await Product.find({_id: req.params.id})
    const review = await Review.create({
        name: req.user.name,
        content: req.body.content
    })
    product.reviews.push(review)
    product.save()
    req.flash("success", "Your review was recorded successfully")
    res.redirect(`/products/${req.params.id}`)
}
exports.deleteReview = (req, res) => {
    res.send("delete review route!")
}