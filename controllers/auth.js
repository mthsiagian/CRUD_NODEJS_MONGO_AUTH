require('dotenv').config();
let validator = require('validator');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

let adminModel = require('../models/adminModel');

exports.register = function(req,res){
    data = Object.assign(req.body) || {};
    
    if(data.email && !validator.isEmail(data.email)){
        return res.status(422).json({
            msg:"Invalid email address."
        })
    }

    var hashedPassword = bcrypt.hashSync(data.password , 8);
    data.password = hashedPassword;

    adminModel.create(data)
        .then( admin =>{
            res.json({
                msg:"New data has been registered",
                data:admin
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.errors
            })
        })
}


// Handle register user actions
exports.login = function (req, res) {
    const data = Object.assign(req.body) || {};

    // save the user and check for errors
    adminModel.findOne({ email: data.email })
		.then(admin => {
            if(!admin){
                return res.status(404).json({
                    message: "Email or Password is not valid"
                });
            }
            //Validate encrypted password
            var IsValidPassword = bcrypt.compareSync(data.password, admin.password);
            if (!IsValidPassword) {
                return res.status(401).json({
                    message: 'Email or Password is not valid'
                });
            }
            // create a token
            var token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRED)
            });
            
			res.json({
                message: 'Login successfully',
                data: admin,
                token: token
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err
            });
		});
};