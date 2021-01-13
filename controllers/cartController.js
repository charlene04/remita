const generator = require('generate-password');

const Product = require("./../models/Products")
const Cart = require("./../models/Carts")
const Coupon = require("./../models/Coupon")

exports.getCart = async (req, res) => {
    res.render('cart.hbs')
}

exports.cartSummary = async (req, res) => {
    const cart = await Cart.findById(req.params.id)
    if(cart){
        console.log(cart)
        return res.render(`checkoutSummary.hbs`, {cart})
    }
    req.flash("error", "Something went wrong. Please try again")
    res.redirect("back")
}

exports.updateCartPayment = async (req, res) => {
    const assigned = "check-me-out-on-the-tracking-system"
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(cart){
        return res.status(200).json({
            "status": "success",
            data:{
                cart
            }
        })
    }
    
}

exports.updateCartCustomerInfo = async (req, res) => {
    const { phone, address, email} = req.body
    const update = {
        customerAddress: address,
        customerTel: phone,
        submittedInfo: true
    }
    const cart = await Cart.findByIdAndUpdate(req.params.id, update, {new: true})
    if(cart){
        return res.redirect(`/my-cart/${cart._id}`)
    }
    req.flash("error", "Something went wrong")
    res.redirect('/my-cart')
    
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
        customerName: req.user.name,
        customerEmail: req.user.email,
        token,
        total: total,
        discount: discount,
    })
    newCart.products = cart
    const updatedCart = await newCart.save()
    if(!updatedCart){
        req.flash("error", "Something went wrong")
        return res.redirect('/my-cart')
    }
    req.flash("success", "Few more steps to finalise your purchases")
    res.redirect(`/my-cart/${updatedCart._id}`)
 })
    
}

exports.applyCoupon = async (req, res, next) => {
    const coupon = await Coupon.findOne({coupon: req.body.coupon})
    const cart = await Cart.findById(req.params.id)
    if(coupon && coupon.applied.includes(req.params.id)){
        return res.status(403).json({
            "status": "fail",
            "message": "Coupon applied already"
        })
    }
    if(cart && coupon){
        cart.discount = cart.discount + coupon.value
        coupon.applied.push(req.params.id)
        coupon.save()
        cart.save(() => {
            let total = cart.total - cart.discount
            return res.status(200).json({
                "status": "success",
                "message": "Coupon applied successfully",
                data: {
                    total
                }
            })
        })
    }
}





