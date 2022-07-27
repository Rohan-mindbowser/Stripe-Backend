const router = require("express").Router();
const express = require("express");

const product_controller = require("../controller/product_controller");

router.post("/checkout", product_controller.stripeCheckout);

router.get("/getproducts", product_controller.getProduct);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_ENDPOINT;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  product_controller.stripePayment
);

//Exporting routes
module.exports = router;
