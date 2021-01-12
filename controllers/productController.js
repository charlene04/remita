const Product = require("./../models/Products")
const Category = require("./../models/Categories")
const Coupon = require("./../models/Coupon");
const schedule = require("node-schedule")
const formidable = require('formidable');
const path = require("path")

const form = formidable({uploadDir: path.join(__dirname, '/../public/uploads/'), keepExtensions:true});

// {
//     encoding: 'utf-8',
//     uploadDir: path.join(__dirname, '/public/uploads'),
//     multiples: true,
//     keepExtensions:true// req.files to be arrays of files


exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
    const categories = await Category.find()
    res.render('dashboard.hbs', { 'products': products, 'categories': categories, 'title': 'Admin Dashboard' })
}


exports.getOneProduct = async (req, res) => {
    const product = await Product.find({ _id: req.params.id })
    res.status(200).json({
        status: "success",
        data:{
            product
        }
    })
}

exports.updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    if(updatedProduct){
        req.flash("success", "Product updated successfully")
        res.redirect("/admin/products")
    }else{
        req.flash("error", "Something went wrong")
        res.redirect("back")
    }
    
}


exports.createProduct = async (req, res) => {
    form.parse(req, async (err, fields, files) => {
    const {name, price, discount, description, category } = fields
    if (!name || !price || !category || !description ){
        req.flash("error", "Please provide all necessary fields");
        return res.redirect("/admin/products")
    }
    const patth = files.image.path.split('\\')

    const newProduct = await Product.create({
                    name,
                    price,
                    discount, 
                    description,
                    category,
                    image:patth[patth.length - 1]
                })
    req.flash("success", "New Product added successfully")
    res.redirect("/admin/products")
})
}

exports.deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({ _id: req.params.id })
    res.status(204).json({message: 'Successfully deleted'})    
}

exports.updateProductImage = async (req, res) => {
    form.parse(req, async (err, fields, files) => {
        const patth = files.image.path.split('\\')
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {image: patth[patth.length - 1]}, {new: true})
        if(!updateProduct){
            req.flash('error', 'Something went wrong. Try again')
            return res.redirect('back')
        }
        req.flash('success', 'Product updated successfully')
        res.redirect('/admin/products')
    })   
}

// CATEGORIES AND COUPONS CONTROLLER



exports.addCategory = async (req, res) => {
    const cat = await Category.create({
        category: req.body.category
    })
    req.flash("success", "Product category added successfully")
    res.redirect("/admin/products")
}

exports.addCoupon = async (req, res, next) => {
    const {value, coupon, days } = req.body
    if(!value || !coupon || !days){
        req.flash("error", "Provide the necessary fields")
        return res.redirect("/admin/products")
    }
    const code = await Coupon.create({
        coupon,
        value
    })
    if(!code){
        req.flash("error", "Coupon must be unique")
        return res.redirect("back")
    }
    let registrationTime = new Date(Date.now());
	let invalidate = new Date(registrationTime.getTime() + (parseInt(days) * 86400000));
	schedule.scheduleJob(invalidate, function () {
        Coupon.findByIdAndDelete(code._id)
    })
    req.flash("success", "Coupon added successfully")
    res.redirect("/admin/products")
    
}