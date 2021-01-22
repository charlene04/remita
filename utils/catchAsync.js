module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            req.flash("error", "Something went wrong. Please check your request and try again.")
            return res.redirect("back")
        })
    }
}