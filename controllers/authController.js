const User = require("./../models/Users")
const jwt = require("jsonwebtoken");
const passport = require("passport")
const AppError = require("./../utils/AppError")

// const signToken = id => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
// }

exports.signup = async (req, res, next) =>{
    try{
        console.log(req.body)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            location: req.body.location
        })
        const createdUser = await User.register(newUser, req.body.password)
        return res.redirect("/auth/login")
    }catch(err){
        console.log(err)
        req.flash("error", "Something went wrong!");
        return res.redirect("back")
    }
    
}


exports.login = async (req, res, next) => {
    // const { password, username} = req.body;
    // if(!username || !password ){
    //     req.flash("error", "Invalid credentials!");
    //     return res.redirect("/auth/login")
    // }
    // const user = await User.findOne({ username }).select('+password');
   
    // if(!user || !await user.correctPassword(password, user.password)){
    //     req.flash("error", "Invalid credentials!");
    //     return res.redirect("back")
    // }
    
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            req.flash("error", "Invalid credentials");
            return res.redirect("back")
        } else if (!user) {
            req.flash("error", "Invalid credentials");
            return res.redirect("back")
        } else {
            req.login(user, (err) => {
            if (err) {
                    req.flash("error", "Something went wrong!");
                    return res.redirect("back")
                } else {
                    req.flash("success", "Successfully logged In!");
                    return res.redirect("/")
                }
            })
        }
      })(req, res, next);
}


exports.logout = async (req, res, next) => {
    req.logout()
    req.flash("success", "Logged out successfully");
    res.redirect("/")
}


	






exports.userLoginForm = (req, res) => {
    res.render('login.hbs')
}

exports.userSignupForm = (req, res) => {
    res.render('Register.hbs')
}
