const Category = require("./../models/Categories")

exports.add = async (req, res) => {
    const cat = await Category.create({
        category: req.body.category
    })
    req.flash("success", "Product category added successfully")
    res.redirect("/products")
}
