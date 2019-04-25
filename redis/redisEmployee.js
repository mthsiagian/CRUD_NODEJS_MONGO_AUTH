employeeModel = require('../models/employeeModel');
let redis = require('../redis/connect');

// get employee by ID
exports.getByIDCached = function (id, callback) {
    
    redis.get(id, function (err, reply) {
        if (err) callback(500, err, null);
        else if (reply) {   //employee present in cache
            console.log("Cache Redis Employee key : " + id);
            callback(null, null, JSON.parse(reply));
        } else {
            //Employee doesn't exist in cache - we need to query the main database
            employeeModel.findById(id)
            .then(employee => {
                if (!employee) {
                    callback(404, "Employee not found", null);
                }
                else {
                    console.log("Get Employee from DB key : " + id);
                    redis.set(id, JSON.stringify(employee), function () {
                        callback(null, null, employee);
                    });
                }
            })
            .catch(err => {
                callback(422, err, null);
            });
        }
    });
};

// update employee by ID
exports.updateById = function (id, data, callback) {
    employeeModel.findOneAndUpdate({ _id: id }, data, {new: true})
		.then(employee => {
			if (!employee) {
				callback(404, "Employee not found", null);
            }else {
            //Save new employee version to cache
                redis.set(id, JSON.stringify(employee), function (err) {
                    if (err) callback(500, err, null);
                    else {
                        console.log("Redis employee key : " + id + " updated");
                        callback(null, null, employee);
                    }
                });
            }
		})
		.catch(err => {
            callback(422, err, null);
        });
};

// delete employee by ID
exports.deleteByIDCached = function (id, callback) {
    employeeModel.findOneAndDelete(
		{ _id: id }
	)
    .then(employee => {
        if (!employee) {
            callback(404, "Employee not found", false);
        }
        else {
            //Delete employee from cache
            redis.del(id, function (err) {
                if (err) callback(500, err, false);
                else {
                    console.log("Redis employee key : " + id + " deleted");
                    callback(null, null, true);
                }
            });
        }
    })
    .catch(err => {
        callback(422, err, false);
    });
};