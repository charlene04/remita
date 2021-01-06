const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({path: './config.env'})
const app = require('./app')

// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(con => {
    console.log("DB connecton successful!")
}).catch(err => {
    console.log("Something went wrong while connecting to database!")
})

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})