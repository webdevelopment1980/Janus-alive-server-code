const mongoose = require('mongoose');
const type = new mongoose.Schema({
    typevalue :{
        type:String
    }
})
const Type = mongoose.model('Type',type);
module.exports = Type