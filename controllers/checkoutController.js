const Cart = require("./../models/Carts")


exports.getAllCheckouts = async (req, res) => {
    const carts= await Cart.find()
    res.render('checkouts.hbs', { 'carts': carts, 'title': 'Admin Dashboard' })
}

