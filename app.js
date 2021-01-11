const express = require('express')
const path = require("path")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const fs = require('fs')
const hbs = require("express-handlebars")
const passport = require("passport")
const Handlebars = require("handlebars")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser")

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public/')))
const formidable = require('express-formidable');
const cookieParser = require("cookie-parser")


// app.use(formidable({
// encoding: 'utf-8',
// uploadDir: path.join(__dirname, '/public/uploads'),
// multiples: true,
// keepExtensions:true// req.files to be arrays of files
// }));
// app.use(express.json())



app.use(cookieParser());
app.use(
	session({
	  secret: "SECRET",
	  resave: false,
	  saveUninitialized: false,
	  cookie: { secure: false },
	  store: new MongoStore({
		mongooseConnection: mongoose.connection,
	  }),
	})
  );
  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});



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

// // Register HelperFxn
// Handlebars.registerHelper('greaterThan', function (v1, v2, options) {
// 	'use strict';
// 	   if (v1>v2) {
// 		 return options.fn(this);
// 	  }
// 	  return options.inverse(this);
// 	});

Handlebars.registerHelper('gte', function( a, b ){
	var next =  arguments[arguments.length-1];
	return (a > b) ? next.fn(this) : next.inverse(this);
});
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
Handlebars.registerHelper("greaterThan", function (a, b) {
	var next = arguments[arguments.length - 1];
	return a > b ? next.fn() : next.inverse();
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
	res.render('error.hbs', {'link': req.originalUrl })
})


//view engine setup
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "index", layoutsDir: __dirname + "/views/layouts/",
handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");








module.exports = app