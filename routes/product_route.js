const router = require("express").Router();
const express = require("express");

const product_controller = require("../controller/product_controller");

router.post("/checkout", product_controller.stripeCheckout);

router.get("/getproducts", product_controller.getProduct);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_97bc81570a3b23e01eded64f58a0facdaa469d67b83c8fac2b7b3e381cb28914";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    console.log(request.body);
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//Exporting routes
module.exports = router;
