const mongoose = require('mongoose');
const statesandcity = new mongoose.Schema({
    state: {
        type: String
    },
    city: [{ type: String }]
});

const StatesandCity = mongoose.model('StatesandCity', statesandcity);
module.exports = StatesandCity