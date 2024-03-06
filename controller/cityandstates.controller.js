const statesandcity = require("../model/Statesandcity.model")

const addData = async (req, res, next) => {
    try {
        const { city, state } = req.body;
        const data = new statesandcity({ city, state });
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const getdata = async (req, res, next) => {
    try {
        const data = await statesandcity.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteCityState = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await statesandcity.findByIdAndDelete(id)
        if (!data) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        // res.status(200).json(data);
        res.status(200).json({ message: 'Deletion successful' });
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

module.exports = { addData, getdata, deleteCityState }