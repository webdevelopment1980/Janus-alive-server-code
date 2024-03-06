const ContactFormModel = require("../model/contactform.model")
const nodemailer = require("nodemailer")
require("dotenv").config();

const ContactForm = async (req, res, next) => {
    try {
        const { name, email, phone, city, message } = req.body
        const data = new ContactFormModel({ name, email, phone, city, message })
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
            // to: email, // list of receivers
            to: 'prateek@januskoncepts.net', // list of receivers
            subject: "Thank You for contacting us",
            text:
                `Dear ${name},
                ${city},
                ${phone}
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

module.exports = { ContactForm };