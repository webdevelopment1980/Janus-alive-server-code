const mongoose = require("mongoose");
require('dotenv').config();
async function mongoConnect() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(
            "MongoDB connected Sucessfulyy :) ",
            connection.connection.host
        );

    } catch (err) {
        if (err) {
            console.log("uri: ", process.env.MONGO_URL);
            console.log(`Error is: ${err.message}`);
            process.exit();
        }
    }
}

module.exports = mongoConnect;
