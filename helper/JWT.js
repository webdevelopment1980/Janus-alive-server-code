const JWT = require('jsonwebtoken');

const generateJwtToken = (payload) => {
    return JWT.sign(payload, process.env.JWT_SECRET || '2c89956d186a75693f2be77a79874107ed7fc7e2f860f0156abe8e2c20e5b12d')
}
const verifyJwtToken = (token) => {
    const decoded = JWT.verify(token, process.env.JWT_SECRET || '2c89956d186a75693f2be77a79874107ed7fc7e2f860f0156abe8e2c20e5b12d')
    return decoded
}

module.exports = { generateJwtToken, verifyJwtToken }