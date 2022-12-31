const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true})
mongoose.set('strictQuery', true);
const connection = mongoose.connection
connection.on('error', (error) => {console.log(error)})
connection.on('connected', () => {console.log("Connected!!!")})