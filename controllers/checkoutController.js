const Cart = require("./../models/Carts");


exports.getAllCheckouts = async (req, res) => {
    const carts= await Cart.find()
    res.render('checkouts.hbs', { 'carts': carts, 'title': 'Admin Dashboard'})
}

exports.getCheckout = async (req, res) => {
    const checkout = await Cart.findById(req.params.id)
    res.status(200).json({
        "status":"success",
        data:{
            checkout
        }
    })
}

exports.updateCheckout = async (req, res) => {
    await Cart.findByIdAndUpdate(req.params.id, {deliveryStatus: req.body.delivery}, {new: true})
    req.flash("success", "Checkout updated successfully")
    res.redirect("/admin/checkouts")
}

exports.deleteCheckout = async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
    req.flash("success", "Checkout deleted successfully")
    res.redirect("/admin/checkouts")
}