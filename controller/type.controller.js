const Type = require("../model/Type.model");
const logger = require("../helper/logger");

const addData = async (req, res, next) => {
    try {
        const { typevalue } = req.body;
        if (!typevalue) {
            return res.status(400).json({ message: "Type value is required" });
        }
        const data = new Type({ typevalue });
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        logger.info({ message: error.message })
        res.status(500).json({ message: error.message });
    }
};


const getdata = async (req, res, next) => {
    try {
        const data = await Type.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {addData,getdata}