const express = require('express')
const router = express.Router();
const citystates = require("../controller/cityandstates.controller");

router.post('/', citystates.addData);
router.get("/", citystates.getdata);
router.delete("/delete/:id", citystates.deleteCityState)

module.exports = router