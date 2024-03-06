const express = require('express')
const router = express.Router();
const contactform = require("../controller/contactform.controller")

router.post('/', contactform.ContactForm)

module.exports = router