const express = require("express")
const router = express.Router();
const { registerUser, adminLogin } = require('../controller/Auth')

router.post('/register', registerUser)
router.post('/login', adminLogin)
module.exports = router