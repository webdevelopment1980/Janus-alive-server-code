const QueryModel = require("../model/Query.model")
const product = require("../model/Product.model")
const nodemailer = require("nodemailer");
require("dotenv").config();

const Senduserquery = async (req, res, next) => {
    try {
        const { name, email, phone, message, ProductId } = req.body
        const products = await product.findById(ProductId)
        const data = new QueryModel({ name, email, phone, message, ProductId, add: products.address })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: {
                name: 'Janus Alive',
                address: process.env.USER
            }, // sender address
            to: 'birender@januskoncepts.com', // list of receivers
            subject: "Thank You for contacting us",
            text:
                `Dear ${name},hello ${products.address}
             `,
        };

        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions)
                console.log("Mail Sent succesfully")
            } catch (error) {
                console.log(error);
            }
        }

        sendMail(transporter, mailOptions)

        await data.save()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

const getValues = async (req, res, next) => {
    try {
        const getquery = await QueryModel.find({});
        res.status(200).json(getquery);
    }
    catch (error) {
        console.log(error)
        res.status(500).message({ message: error.message })
    }
}

const deletequery = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = await QueryModel.findByIdAndDelete(id);
        if (!query) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        res.status(200).json(query)
    }
    catch (error) {
        console.log(error)
        res.status(500).message({ message: error.message })
    }
}

module.exports = { Senduserquery, getValues, deletequery }