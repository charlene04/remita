const express = require('express')
const path = require("path")
const methodOverride = require("method-override")
const flash = require("connect-flash")
const fs = require('fs')
const expbs = require("express-handlebars")
const passport = require("passport")
const Handlebars = require("handlebars")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);
const favicon = require('serve-favicon')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.EMAIL_KEY);

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public/')))


app.use(fileUpload())

app.use(cookieParser());
app.use(
	session({
	  secret: process.env.SESSION_SECRET,
	  resave: false,
	  saveUninitialized: false,
	  cookie: { secure: false, maxAge: 3600000 },
	  store: new MongoStore({
		mongooseConnection: mongoose.connection,
	  }),
	})
  );
app.use(favicon(__dirname + '/favicon.ico'));
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



app.post("/email", async (req, res) => {
    const msg = {
		to: req.body.email,
    	from: 'developmenthub123@gmail.com',
    	subject: 'Thank you for your patronage - WuseVarietyStores',
		html: `<h4>Hello dear,</h4>
		<p>We at WuseVarietyStores are glad to have served you well. A staff of ours will reach out to you as regards your order.</p>
		<p>Here is your ORDER_TOKEN: ${req.body.token}</p><p>We look forward to serving you better next time</p><br> <em>Warm Regards</em>
		`
	};
		sgMail.send(msg).then(() => {
			res.status(200).json({
				"status":"success",
				"message":"Email sent"
			})
		}).catch(error => {
			res.status(400).json({
				"status":"fail",
				"message":"Email sending failed"
			})
		})
	})



const authRouter = require("./routes/authRouter")
const cartRouter = require("./routes/cartRouter")
const productRouter = require("./routes/productRouter")
const reviewRouter = require("./routes/reviewRouter")
const checkoutRouter = require("./routes/checkoutRouter")
const usersRouter = require("./routes/usersRouter")
const homeRouter = require("./routes/homeRouter")
const shopRouter = require("./routes/shopRouter")
const Product = require('./models/Products')

app.use('/my-cart', cartRouter)
app.use('/auth', authRouter)
app.use('/products', reviewRouter)
app.use("/", homeRouter)
app.use('/admin/products', productRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/checkouts', checkoutRouter)
app.use("/shop", shopRouter)

app.all("*", async (req, res, next) => {
	res.render('error.hbs', {'link': req.originalUrl })
})


//view engine setup
const hbs = expbs.create({
	extname: "hbs", 
	defaultLayout: "index", 
	layoutsDir: __dirname + "/views/layouts/",
	handlebars: allowInsecurePrototypeAccess(Handlebars),
	helpers:{
		diff: function(a, b){
			return a - b
		},
		equal: function(a, b){
			return a === b
		}
	}
})
app.engine("hbs", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");



module.exports = app

