const Product = require("./../models/Products")

exports.gallery = async (req, res) => {
    const products = await Product.find()
    res.render('shop.hbs', { products })
}