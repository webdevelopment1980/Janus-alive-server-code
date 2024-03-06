const Product = require("../model/Product.model")
const { generateRandomCode } = require("../helper/code");
const logger = require("../helper/logger");

// get all products
// const getAllProducts = async (req, res, next) => {
//     // const { search } = req.query;
//     console.log(req.query)
//     try {
//         let products = await Product.find(req.query);
//         // if (search) {
//         //     products = await Product.find({
//         //         $or: [
//         //             { name: new RegExp(search, 'i') },
//         //         ],
//         //     });
//         // } else {
//         //     products = await Product.find();
//         // }
//         res.status(200).json(products);
//     } catch (error) {
//         console.log(error)
//         res.status(503).json({ message: error.message })
//     }
// }
// const getAllProducts = async (req, res, next) => {
//     try {
//         // Validate and sanitize query parameters
//         const { city, state, category } = req.query;
//         console.log(req.query)
//         const regCity = new RegExp(city.toLowerCase()
//         )
//         const regState = new RegExp(state.toLowerCase())
//         let query = {};

//         // Apply city filter if provided
//         if (category) {
//             query.category = category;
//         }
//         if (city) {
//             query.city = { $regex: regCity };
//         }

//         // Apply category filter if provided
//         if (state) {
//             query.state = { $regex: regState };;
//         }

//         // Fetch products based on the query
//         let products = await Product.find(query);

//         logger.info("API request made to get all products")

//         // Respond with the products
//         res.status(200).json(products);
//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error(error);
//         // Respond with an error message
//         res.status(503).json({ message: 'Error fetching products', error: error.message });
//     }
// };

// const getAllProducts = async (req, res, next) => {
//     try {
//         // Validate and sanitize query parameters
//         const { city, state, category } = req.query;
//         console.log(req.query)

//         // Initialize regular expressions
//         const regCity = city ? new RegExp(city.toLowerCase()) : null;
//         const regState = state ? new RegExp(state.toLowerCase()) : null;

//         let query = {};

//         // Apply city filter if provided
//         if (category) {
//             query.category = category;
//         }
//         if (regCity) {
//             query.city = { $regex: regCity };
//         }

//         // Apply category filter if provided
//         if (regState) {
//             query.state = { $regex: regState };
//         }

//         // Fetch products based on the query
//         let products = await Product.find(query);

//         logger.info("API request made to get all products");

//         // Respond with the products
//         res.status(200).json(products);
//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error(error);
//         // Respond with an error message
//         res.status(503).json({ message: 'Error fetching products', error: error.message });
//     }
// };

const getAllProducts = async (req, res, next) => {
    try {
        // Validate and sanitize query parameters
        const { state, subcat } = req.query;
        console.log(req.query)

        // Initialize regular expression
        const regLocation = state ? new RegExp(state.toLowerCase()) : null;
        const regCategory = subcat ? new RegExp(subcat.toLowerCase()) : null;

        let query = {};

        // Apply category filter if provided
        // if (subcat) {
        //     query.subcat = subcat;
        // }

        // Apply location filter if provided
        if (regLocation) {
            query.$or = [
                { city: { $regex: regLocation } },
                { state: { $regex: regLocation } }
            ];
        }
        if(regCategory){
            query.subcat={ $regex:  regCategory, $options:"i"} 
        }
        // Fetch products based on the query
        let products = await Product.find(query);

        logger.info("API request made to get all products");
        logger.info(`API request made to get all products ${req.query}`);

        // Respond with the products
        res.status(200).json(products);
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        // Respond with an error message
        res.status(503).json({ message: 'Error fetching products', error: error.message });
    }
};




// get Single Product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}
// get Single Product by ID and update
const getProductByIdUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
// create Product
const createProduct = async (req, res) => {
    const code = generateRandomCode(8)
    try {
        const { address, price, totalsqft, image, category, city, heightwidth, state, district, hoadingcode, seotitle, seodesc, desc, illumination, subcat, title, url, urlcat } = req.body;
        const product = new Product({ address, price, totalsqft, image, category, city, heightwidth, state, district, hoadingcode, seotitle, seodesc, desc, illumination, code, subcat, title, url, urlcat })
        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

// Add Multiple products (accessible to Dealer and Admin)
const addMultipleProducts = async (req, res) => {
    try {
        const { products } = req.body;
        console.log(typeof products);
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                error: "Invalid request body. Expected an array of products.",
            });
        }

        const createdProducts = await Product.create(products);

        res.status(201).json({
            message: "Products added successfully",
            products: createdProducts,
        });
    } catch (error) {
        res
            .status(500)
            .json({ payload: null, message: error.message || "An error occurred" });
    }
};

// delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

const productbyurl = async (req, res) => {
    try {
        const URL = req.params.url;
        const product = await Product.findOne({ url: URL });
        if (!product) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = { getAllProducts, getProductById, getProductByIdUpdate, createProduct, deleteProduct, addMultipleProducts, productbyurl };
