let express = require('express')
let router = express.Router();
let auth_token = require('./controllers/auth-token')

var auth = require('./controllers/auth')
var employee = require('./controllers/employee')
var redisEmployee = require('./controllers/redisEmployee')

// Admin login and register routes
router.route('/login').post(auth.login);
router.route('/register').post(auth.register);

// Employee routes
router.route('/employee')
.post(auth_token.validToken,employee.newEmployee)
.get(auth_token.validToken,employee.findAll)
router.route('/employee/:id')
.put(auth_token.validToken,employee.update)
.get(auth_token.validToken,employee.findEmployee)
.delete(auth_token.validToken,employee.delete)

// Employee redis routes
router.route('/redis-employee')
.post(auth_token.validToken,redisEmployee.new)
router.route('/redis-employee/:id')
.get(auth_token.validToken,redisEmployee.show)
.put(auth_token.validToken,redisEmployee.update)
.delete(auth_token.validToken,redisEmployee.delete)


module.exports = router;