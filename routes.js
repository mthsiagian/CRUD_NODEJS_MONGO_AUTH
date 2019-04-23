let express = require('express')
let router = express.Router();

var auth = require('./controllers/auth')
var employee = require('./controllers/employee')

router.route('/login').post(auth.login);
router.route('/register').post(auth.register);

module.exports = router;