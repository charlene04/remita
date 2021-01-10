const Product = require("./../models/Products")
const Category = require("./../models/Categories")
const Coupon = require("./../models/Coupon");
const schedule = require("node-schedule")


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
    const updatedProduct = await Product.findByIdAndUpdate({_id: req.params.id}, req.fields, {new: true})
    if(updatedProduct){
        req.flash("success", "Product updated successfully")
        res.redirect("/admin/products")
    }else{
        req.flash("error", "Something went wrong")
        res.redirect("/admin/products")
    }
    
}


exports.createProduct = async (req, res) => {
    const {name, price, discount, description, category } = req.fields
    if (!name || !price || !category || !description ){
        console.log("some")
        req.flash("error", "Please provide all necessary fields");
        return res.redirect("/admin/products")
    }
    const patth = req.files.image._writeStream.path.split('\\')
    console.log(patth[-1])

    const newProduct = await Product.create({
                    name,
                    price,
                    discount, 
                    description,
                    category,
                    image:patth[patth.length - 1]
                })
          
    res.redirect("/admin/products")
}


exports.deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({ _id: req.params.id })
    res.status(204).json({message: 'Successfully deleted'})    
}


// CATEGORIES AND COUPONS CONTROLLER



exports.addCategory = async (req, res) => {
    const cat = await Category.create({
        category: req.fields.category
    })
    req.flash("success", "Product category added successfully")
    res.redirect("/admin/products")
}

exports.addCoupon = async (req, res, next) => {
    const {value, coupon, days } = req.fields
    if(!value || !coupon || !days){
        req.flash("error", "Provide the necessary fields")
        return res.redirect("/admin/products")
    }
    const code = await Coupon.create({
        coupon,
        value
    })
    let registrationTime = new Date(Date.now());
	let invalidate = new Date(registrationTime.getTime() + (parseInt(days) * 86400000));
	schedule.scheduleJob(invalidate, function () {
        Coupon.findByIdAndDelete(code._id)
    })
    if(code){
        req.flash("success", "Coupon added successfully")
        res.redirect("/admin/products")
    }
    
}