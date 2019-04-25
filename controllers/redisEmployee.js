let employeeModel = require('../models/employeeModel')
let access = require('../redis/redisEmployee')

exports.new = function (req, res) {
    var data = req.body
    // save the employee and check for errors
    employeeModel.create(data)
		.then(employee => {
			res.status(201).json({
                message: 'New data has been added!',
                data: employee
            });
		})
		.catch(err => {
			res.status(500).json({
                message: err.errors
            });
		});
};

exports.show = function (req, res) {
    if (!req.params.id) {
        return res.status(400).json({
            message: "ID not found!"
        });
    }
    
    // get data from redis
    access.getByIDCached(req.params.id, function (code, err, employee) {
        if (err) {
            console.log("kena disni")
            return res.status(code).json({
                message: err
            });
        }
        
        res.json({
            message: "Employee data retrieved succesfully",
            data: employee
        });
    });
};

exports.update = function (req, res) {
    const data = req.body || {};
    
    // update data employee on redis
    access.updateById(req.params.id, data, function (code, err, employee) {
        console.log(data)
        if (err) {
            return res.status(code).json({
                message: err
            });
        }
        
        res.json({
            message: "Employee Info updated",
            data: employee
        });
    });
};

// Handle delete employee
exports.delete = function (req, res) {
    // delete data employee from redis
    access.deleteByIDCached(req.params.id, function (code, err, employee) {
        if (err) {
            return res.status(code).json({
                message: err
            });
        }
        
        res.status(302).json({
            message: "Employee successfully deleted"
        });
    });
};