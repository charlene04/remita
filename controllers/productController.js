const Product = require("./../models/Products")
const Category = require("./../models/Categories")

exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
    const categories = await Category.find()
    res.render('dashboard.hbs', { 'products': products, 'categories': categories, 'title': 'Admin Dashboard' })
}


exports.getOneProduct = async (req, res) => {
    const product = await Product.find({ _id: req.params.id })
    res.render('productDetail.hbs', {'product': product})
}

exports.updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, req.body)
    if(updatedProduct){
        req.flash("success", "Product updated successfully")
        req.redirect("/products")
    }else{
        req.flash("error", "Something went wrong")
        req.redirect("/products")
    }
    
}


exports.createProduct = async (req, res) => {
    const {name, price, category, description } = req.body
    if (!name || !price || !category || !description ){
        req.flash("error", "Please provide all necessary fields");
        return res.redirect("/products")
    }
    const foundCategory = await Category.find({ category: req.body.category })
    const newProduct = await Product.create({
        name, price, discount, description
    })
    newProduct.category = foundCategory;
    newProduct.save()
    res.redirect("/products")
}


exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete({_id: req.params.id})
    req.flash("success", "Product deletion successful")
    req.redirect("/products")    
}