let mongoose = require('mongoose')

var adminSchema = mongoose.Schema({
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
    }
})
module.exports = mongoose.model('admin', adminSchema)