const AppError = require("./../utils/AppError")

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            req.flash("error", "Unauthorised!")
            return res.redirect('/auth/login')
        }
        return next()
    }
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error", "Please login")
    return res.redirect('/auth/login')
    
}
