const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let payment = new Schema({
  customer_id: String,
  customer_name: String,
  email: String,
  payment_intent: String,
  payment_method_type: String,
  curreny: String,
  amount: Number,
  payment_status: String,
});

module.exports = mongoose.model("stripe_payments", payment);
