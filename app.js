require('dotenv').config();

let express = require('express');
let app = express();
let mongoose = require('mongoose');
var bodyParser = require('body-parser');
const cors = require('cors');

var employeeRoute = require('./controllers/employee')
var routes = require('./routes')
// mongoose.connect(process.env.mongo_uri

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Default URL
app.get('/',(req,res) => {
    res.send('SIMPLE CRUD APPLICATION');
})

//middleware function to log requested API
app.use((req,res,next)=>{   
    console.log(`${new Date().toString()} -- ${req.originalUrl}`);
    next(); //End with next or a response!
});

// API Routing
app.use('/api',routes);


const DB_URI = process.env.DB_URI  
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : process.env.APP_PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running using PORT ${PORT}`);
    mongoose.connect(DB_URI, { useNewUrlParser: true,useFindAndModify: false, useCreateIndex: true},() =>{
        console.log('Connection to database Successfull')
    });

})