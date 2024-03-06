const express = require('express')
const router = express.Router();
const type = require("../controller/type.controller")

router.post("/",type.addData);
router.get("/",type.getdata)

module.exports = router