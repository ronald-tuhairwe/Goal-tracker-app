const express = require('express');
const router = express.Router();

const logincontroller = require('../controllers/logincontroller'); 

router.get('/', logincontroller.test)
router.post('/login', logincontroller.login);
router.post('/signup', logincontroller.signup);
router.get('/authenticate', logincontroller.authenticate);

module.exports = router;