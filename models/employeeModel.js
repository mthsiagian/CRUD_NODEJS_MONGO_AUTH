let mongoose = require('mongoose')

var employeeSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email: {
        type : String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    address : {
        type : String
    },
    position : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    }
})
module.exports = mongoose.model('employee', employeeSchema)