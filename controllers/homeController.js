exports.home = async (req, res, next) => {
    res.render('landingPage.hbs', {'title': "Wuse Variety Stores | Home"})
}