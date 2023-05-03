require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongo = require("./shared/mongo");


//routes modules imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/users.routes");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/orders.routes");
const stripeRoutes = require("./routes/stripe.routes");

(async () => {
    try {
        app.use(cors());
        app.use(express.json());

        await mongo.connect(); //call the mongo connect() for run db

        const port = process.env.PORT || 3001;
        // verfication in browser
        app.get("/", (req, res) => {
            res.status(200).send("<h2 >Server is running successfully </h2>");
        });

        //middlewares
        app.use("/auth", authRoutes);

        app.use("/users", userRoutes);

        app.use("/product", productRoutes);

        app.use("/cart", cartRoutes);

        app.use("/order", orderRoutes);

        app.use("/checkout", stripeRoutes);

        //server starter
        app.listen(port, () => {
            console.log(`server running at ${port}`);
        });
    } catch (error) {
        console.log("error in connecting db", error.message);
    }
})();