
const Product = require("./../models/Products")
const catchAsync = require("./../utils/catchAsync")
exports.home = catchAsync(async (req, res, next) => {
    const products = await Product.find().limit(8)
    res.render('landingPage.hbs', {'title': "Wuse Variety Stores | Home", products})
})