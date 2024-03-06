const mongoose = require("mongoose");

const queryForm = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: Number
        },
        message: {
            type: String
        },
        ProductId: {
            type: mongoose.Schema.Types.ObjectId
        },
        add: {
            type: String
        }
    }, { timestamps: true }
)
const contact = mongoose.model("query", queryForm);
module.exports = contact