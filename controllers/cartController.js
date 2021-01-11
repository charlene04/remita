const Product = require("./../models/Products")
const Cart = require("./../models/Carts")
const generator = require('generate-password');

exports.getCart = async (req, res) => {
    res.render('cart.hbs')
}

exports.cartSummary = async (req, res) => {
    const cart = await Cart.findById(req.params.id)
    if(cart){
        return res.render(`checkoutSummary.hbs`, {'cart': cart})
    }
    return res.render(`checkoutSummary.hbs`, {'cart': cart})
}

exports.updateCartPayment = async (req, res) => {
    const assigned = "check-me-out-on-the-tracking-system"
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(cart){
        return res.render(`successful.hbs`, {'token': cart._id})
    }
    return res.render(`successful.hbs`, {'token': assigned})
}

exports.updateCartCustomerInfo = async (req, res) => {
    const { firstName, lastName, phone, address, email} = req.body
    const update = {
        customerAddress: address,
        customerEmail: email,
        customerName: firstName + " " + lastName,
        customerTel: phone,
        customerInfo: true
    }
    const cart = await Cart.findByIdAndUpdate(req.params.id, {update}, {new: true})
    if(cart){
        return res.redirect(`/carts/${cart._id}`)
    }
    req.flash("error", "Something went wrong")
    res.redirect('/carts')
    
}


exports.createCart = async (req, res) => { 
    const token = generator.generate({
        length: 15,
        numbers: true,
    });
    let data = JSON.parse(req.body.stringArray)
    let total = 0;
    let discount = 0;
    let cart = []
    let promises = data.map( async element => {
        const item = await Product.findById({_id: element.id})
        total += item.price * element.quantity
        discount += item.discount * element.quantity
        let result = {name: item.name, quantity: element.quantity, sum: item.price * element.quantity}
        cart.push(result)
    })
   
    Promise.all(promises).then( async ()=>{

    
    const newCart = await Cart.create({
        token,
        total: total,
        discount: discount,
    })
    newCart.products = cart
    const updatedCart = await newCart.save()
    if(!updatedCart){
        req.flash("error", "Something went wrong")
        return res.redirect('/carts')
    }
    req.flash("success", "Few more steps to finalise your purchases")
    res.redirect(`/carts/${updatedCart._id}`)
 })
    
}






