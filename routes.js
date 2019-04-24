let express = require('express')
let router = express.Router();
let auth_token = require('./controllers/auth-token')

var auth = require('./controllers/auth')
var employee = require('./controllers/employee')

router.route('/login').post(auth.login);
router.route('/register').post(auth.register);

// Employee routes
router.route('/employee')
.post(auth_token.validToken,employee.newEmployee)



module.exports = router;