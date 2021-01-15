const catchAsync = require("../utils/catchAsync")
const Product = require("./../models/Products")

exports.gallery = catchAsync(async (req, res) => {
    const products = await Product.find()
    res.render('shop.hbs', { products })
}
)
exports.productDetail = catchAsync(async (req, res) => {
    const product = await Product.findById({_id: req.params.id})
    res.render('productpage.hbs', {product})
})