require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

//routes modules imports

(async () => {
    try {
        app.use(cors());
        app.use(express.json());

        const port = process.env.PORT || 3001;
        // verfication in browser
        app.get("/", (req, res) => {
            res.status(200).send("<h2 >Server is running successfully </h2>");
        });

        //middlewares

        //server starter
        app.listen(port, () => {
            console.log(`server running at ${port}`);
        });
    } catch (error) {
        console.log("error in connecting db", error.message);
    }
})();