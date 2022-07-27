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
  (request, response) => {
    // console.log("After payment :",request.body.data.object);
    let data = request.body.data.object;

    // console.log("***************************************");
    if (data.object === "charge") {
      console.log(data.amount);
      console.log(data.billing_details.email);
      console.log(data.billing_details.name);
      console.log(data.currency);
      console.log(data.customer);
      console.log(data.currency);
      console.log(data.payment_intent);
      console.log(data.payment_method_details.type);
      console.log(data.status);
    }

    response.send();
  }
);

//Exporting routes
module.exports = router;
