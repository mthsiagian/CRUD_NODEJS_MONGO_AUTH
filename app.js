require('dotenv').config();

let express = require('express');
let app = express();
let mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var employeeRoute = require('./controllers/employee')
var routes = require('./routes')
// mongoose.connect(process.env.mongo_uri

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',(req,res) => {
    res.send('Express JS');
})

app.use('/api',routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running using PORT ${PORT}`);
    mongoose.connect('mongodb+srv://companydb:dbcompany@cluster0-ucpqj.mongodb.net/test?retryWrites=true', { useNewUrlParser: true, useCreateIndex: true},() =>{
        console.log('Connection to database Successfull')
    });

})