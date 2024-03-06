const Category = require('../model/Category.Model')

const createCategory = async (req, res, next) => {
    try {
        const { category, img } = req.body;
        const product = new Category({ category, img })
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

const getallCategory = async (req, res, next) => {
    try {
        const category = await Category.find({})
        res.status(200).json(category)
    }
    catch (error) {
        console.log(error)
        res.status(500).message({ message: error.message })
    }
}

const getCategorybyid = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id)
        if (!category) {
            res.status(403).json({ message: `cannot find category by id ${id}` })
        }
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).message({ message: error.message })
    }
}

// const getCategorybyidandUpdate = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const category = await Category.findByIdAndUpdate(id)
//         if (!category) {
//             res.status(403).json({ message: `cannot find category by id ${id} to update` })
//         }
//         res.status(200).json(category)
//     } catch (error) {
//         console.log(error)
//         res.status(500).message({ message: error.message })
//     }
// }
const getCategorybyidandUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

        if (!category) {
            return res.status(404).json({ message: `Cannot find category with id ${id} to update` });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getCategoryandDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id)
        if (!category) {
            res.status(403).json({ message: `cannot find category by id ${id} to update` })
        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

module.exports = { createCategory, getallCategory, getCategorybyid, getCategorybyid, getCategoryandDelete, getCategorybyidandUpdate }