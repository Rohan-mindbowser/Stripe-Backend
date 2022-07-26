const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let product = new Schema({
    product_name : String,
    price:Number,
    images:[String],
    product_id:String
});

module.exports = mongoose.model("stripe_products", product);