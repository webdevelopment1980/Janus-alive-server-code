const bcrypt = require('bcrypt');
const Joi = require('joi')
const User = require('../model/User.model')
const { generateJwtToken } = require('../helper/JWT')

const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
});

const registerUser = async (req, res) => {
    try {
        const { error } = registerUserSchema.validate(req.body);
        if (error) {
            console.log(error)
            return res.status(400).json({
                payload: null,
                message: error.details[0].message || 'an unknown error occured during validation'
            })
        }

        const { name, mobile, email, role, password } = req.body;
        const phonenumberRegistered = await User.findOne({ mobile });
        const emailRegistered = await User.findOne({ email });

        // to restricy creating a new admin uncomment down the bottom code
        // if (role === 'Admin' || role === 'admin') {
        //     return res.status(401).json({
        //         payload: null,
        //         message: "Admin Role is not allowed to register",
        //     })
        // }
        if (phonenumberRegistered) {
            const userid = phonenumberRegistered._id;
            if (userid) {
                return res.status(405).json({
                    payload: null,
                    message: "Looks like you already Have an account with us.",
                });

            } else {
                return res.status(409).json({
                    payload: null,
                    message: "Looks like your Phone Number already Exists.",
                });
            }
        }
        if (emailRegistered) {
            const userid = emailRegistered._id;
            if (userid) {
                return res.status(405).json({
                    payload: null,
                    message: "Looks like you already Have an account with us.",
                });

            } else {
                return res.status(409).json({
                    payload: null,
                    message: "Looks like your Email already Exists.",
                });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            mobile,
            email,
            password: hashedPassword,
            role,
        })
        const payload = {
            name: newUser.name,
            email: newUser.email,
            _id: newUser.id,
            mobile: newUser.mobile
        };
        const token = generateJwtToken(payload)
        return res.status(201).json({
            message: "User created successfully",
            payload,
            userId: newUser.id,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            payload: null,
            message: error.message || "An error occurred",
        });
    }
}

const loginSchema = Joi.object({
    email: Joi.string().email(),
    mobile: Joi.number(),
    password: Joi.string().required(),
})

const adminLogin = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { mobile, email, password } = req.body;
        const user = await User.findOne({ $or: [{ mobile }, { email }] });
        if (!user) { res.status(401).json({ message: "Invalid mobile or password or not a Admin" }); }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ message: "Invalid mobile or password or not a user" });
        }
        if (user.role !== "Admin") {
            return res.status(401).json({ message: "You are not an admin" });
        }
        const payload = {
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            _id: user.id,
        };

        const token = generateJwtToken(payload);

        res.status(200).json({ message: "Login G", token, User: payload });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "An error occurred" });
    }
}


const logInUser = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message:
                    error.details[0].message || "An error occurred during validation",
                payload: null,
            });
        }

        const { mobile, password, email } = req.body;

        if (!mobile && !email) {
            return res.status(400).json({ message: "mobile or email is required" });
        }

        const user = await User.findOne({ $or: [{ mobile }, { email }] });

        if (!user) {
            return res.status(401).json({
                message: "Invalid mobile or Email",
                email,
                mobile,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // const isEmailVerified = user.isEmailVerified;

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid mobile or Email or password or not a user",
                email,
                mobile,
                password,
            });
        }
        // if (!isEmailVerified) {
        //   return res.status(401).json({ message: "Email not verified" });
        // }
        const payload = {
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            _id: user.id,
            userCount: user.userCount
        };

        const token = generateJwtToken(payload);

        res
            .status(200)
            .json({ message: "Login G", token, User: payload, payload: payload });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "An error occurred" });
    }
};


module.exports = {
    registerUser, adminLogin, logInUser
}