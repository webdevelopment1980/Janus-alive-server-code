const mongoose = require('mongoose');

const productschema = mongoose.Schema(
    {
        address: {
            type: String,
            required: [true, "Please enter a Product name"]
        },
        price: {
            type: Number,
            required: false
        },
        totalsqft: {
            type: Number,

        },
        image: {
            type: String,
            required: false
        },
        category: {
            type: String,
        },
        city: {
            type: String,
        },
        heightwidth: {
            type: String,
        },
        state: {
            type: String,
        },
        district: {
            type: String,
        },
        hoadingcode: {
            type: String,
        },
        seotitle: {
            type: String,
        },
        seodesc: {
            type: String,
        },
        desc: {
            type: String,
        },
        illumination: {
            type: String,
        },
        code: {
            type: String,
        }, subcat: {
            type: String
        }, title: {
            type: String
        }, url: {
            type: String
        }, urlcat: {
            type: String
        }
    },
    {
        timestamps: true
    },
)

const Product = mongoose.model("product", productschema);

module.exports = Product;