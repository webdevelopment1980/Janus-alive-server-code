const express = require('express')
const router = express.Router();
const query = require("../controller/query.controller")

router.post('/', query.Senduserquery)
router.get('/', query.getValues)
router.delete('/delete/:id', query.deletequery)

module.exports = router