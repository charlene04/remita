const express = require('express')
const path = require("path")
const flash = require("connect-flash")
const hbs = require("express-handlebars")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public/')))
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(require("express-session")({
	secret: "Charles built this",
	resave: false,
	saveUninitialized: false
}));




const authRouter = require("./routes/authRouter")
const cartRouter = require("./routes/cartRouter")
const productRouter = require("./routes/productRouter")
const reviewRouter = require("./routes/reviewRouter")
const categoryRouter = require("./routes/categoryRouter")
const User = require('./models/Users')
app.use('/user', authRouter)
app.use('/user/cart', cartRouter)
app.use('/products', productRouter)
app.use('/products/reviews', reviewRouter)
app.use('/products/category', categoryRouter)


//view engine setup
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "index", layoutsDir: __dirname + "/views/layouts/"}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");








module.exports = app