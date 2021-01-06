const User = require("./../models/Users")
const jwt = require("jsonwebtoken");
const passport = require("passport")
const AppError = require("./../utils/AppError")

// const signToken = id => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
// }

exports.signup = async (req, res, next) =>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        })
    
        // const token = signToken(newUser._id) 
        res.status(201).json({
            status: "success",
        
            data: {
                user: newUser
            }
        })
    }catch{
        console.log("ERROR")
    }
    
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password ){
        return next(new AppError('Please provide email and password'), 400)
    }
    const user = await User.findOne({ email }).select('+password');
   
    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Incorrect email or password'), 401)
    }

    // const token = signToken(user._id)
    // res.status(200).json({
    //     status: "success",
    //     token
    // })
    const authenticatedUser = await passport.authenticate("local", {
		failureRedirect: "/",
		failureFlash: true,
		successFlash: true}
    )
    if(authenticatedUser){
        req.flash("success", "Successfully logged in as.");
        res.status(200).json({
            status: "success"
        })
    }else{
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/login")
    }
}

	






exports.userLoginForm = (req, res) => {
    res.send("Login route!")
}

exports.userSignupForm = (req, res) => {
    res.send("Signup route!")
}
