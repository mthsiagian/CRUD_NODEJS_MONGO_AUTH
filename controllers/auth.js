require('dotenv').config();
let employeeModel = require('../models/employeeModel');

let validator = require('validator');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.register = function(req,res){
    console.log('Register called');
    data = Object.assign(req.body) || {};
    
    if(data.email && !validator.isEmail(data.email)){
        return res.status(422).json({
            msg:"Invalid email address."
        })
    }

    var hashedPassword = bcrypt.hashSync(data.password , 8);
    data.password = hashedPassword;

    employeeModel.create(data)
        .then( employee =>{
            res.json({
                msg:"New data has been registered",
                data:employee
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
    console.log('Login called');
    const data = Object.assign(req.body) || {};

    // save the user and check for errors
    employeeModel.findOne({ email: data.email })
		.then(employee => {
            if(!employee){
                return res.status(404).json({
                    message: "Email or Password is not valid"
                });
            }

            var IsValidPassword = bcrypt.compareSync(data.password, employee.password);
            if (!IsValidPassword) {
                return res.status(401).json({
                    message: 'Email or Password is not valid'
                });
            }
            // create a token
            var token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRED)
            });
            
			res.json({
                message: 'Login successfully',
                data: employee,
                token: token
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err
            });
		});
};