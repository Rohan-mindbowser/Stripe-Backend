const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));

//Middleware to use json data
app.use(bodyParser.json());

//Imported product routes
const productRoutes = require("./routes/product_route");

//Cors middleware
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

//Products routes 
app.use("/product", productRoutes);

//Server listening
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}..`);
});
