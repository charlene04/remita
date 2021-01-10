const express = require('express')
const path = require("path")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const fs = require('fs')
const hbs = require("express-handlebars")
const passport = require("passport")
const Handlebars = require("handlebars")
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public/')))
const formidable = require('express-formidable');


app.use(formidable({
encoding: 'utf-8',
uploadDir: path.join(__dirname, '/public/uploads'),
multiples: true,
keepExtensions:true// req.files to be arrays of files
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(require("express-session")({
	secret: "Charles built this",
	resave: false,
	saveUninitialized: false
}));
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use(methodOverride("_method"));




// Register Partials
const partialsDir = path.join(__dirname, 'views', 'partials');
const filenames = fs.readdirSync(partialsDir);


filenames.forEach(async (filename) => {
  const matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  const name = matches[1];
  const template = fs.readFileSync(path.join(partialsDir, filename), 'utf8');
  Handlebars.registerPartial(name, template);
});




const authRouter = require("./routes/authRouter")
const cartRouter = require("./routes/cartRouter")
const productRouter = require("./routes/productRouter")
const reviewRouter = require("./routes/reviewRouter")
const checkoutRouter = require("./routes/checkoutRouter")
const usersRouter = require("./routes/usersRouter")

app.use('/carts', cartRouter)
app.use('/auth', authRouter)
app.use('/products/reviews', reviewRouter)

app.use('/admin/products', productRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/checkouts', checkoutRouter)

app.all("*", async (req, res, next) => {
	res.render('error.hbs', {'link': req.originalUrl})
})

//view engine setup
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "index", layoutsDir: __dirname + "/views/layouts/",
handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");








module.exports = app