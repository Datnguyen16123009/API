var express = require('express');
const  checktoken = require('../middleware/checktoken')
var router = express();
var homecontroller = require('../controller/controller')

router.post("/login",homecontroller.login);

router.post("/register",homecontroller.register);
module.exports = router;
