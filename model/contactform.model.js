const mongoose = require("mongoose");

const ContactForm = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        city: {
            type: String
        },
        message: {
            type: String
        },
        phone: {
            type: Number
        }
    }
)
const contact = mongoose.model("ContactForm", ContactForm);
module.exports = contact