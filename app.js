require('dotenv').config();
const express = require('express');
const app = express();
const { Collection, default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 3090
const MONGO_URL = process.env.MONGO_URL
const authRouter = require('./routes/Auth.routes')
const productRoute = require('./routes/product.routes')
const categoryRoute = require('./routes/Category.routes')
const articleRoute = require("./routes/Post")
const query = require("./routes/query.routes")
const contactform = require("./routes/contactform.routes")
const stateandcity = require("./routes/cityandstates.routes")
const type = require("./routes/type.routes")
const cors = require("cors");
const logger = require("./helper/logger")
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const mongoConnect = require("./helper/db");
// mongoConnect()
//cors
app.use(cors());
app.get("/", (req, res) => {
    res.send(`Welcome To Janus Alive Server managed by Prateek Takthar`);
});

app.use(
    "/api/auth",
    authRouter
);
app.use('/api/products', productRoute);
app.use('/api/category', categoryRoute);
app.use("/api/blog", articleRoute);
app.use("/api/query", query)
app.use("/api/conatactform", contactform)
app.use('/api/statescity', stateandcity)
app.use("/api/type",type)

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected succesfully :)");
        app.listen(PORT, (err) => {
            if (err) console.log(err.message)
            console.log('app is running on port', PORT)
        })
    }).catch((error) => {
        console.log("error while connecting to the database ", error);
    })

logger.info('The application is active');
