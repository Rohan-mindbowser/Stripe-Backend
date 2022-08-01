const stripeProductModels = require("../models/stripeProductModel");
const stripePaymentModel = require("../models/stripePaymentModel");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

//Saving payment details in DB
const savePaymentDetails = async (paymentDetails) => {
  try {
    const paymentDetail = await stripePaymentModel.create({
      customer_id: paymentDetails.customer,
      customer_name: paymentDetails.customer_details.name,
      email: paymentDetails.customer_details.email,
      payment_intent: paymentDetails.payment_intent,
      payment_method_type: paymentDetails.payment_method_types[0],
      curreny: paymentDetails.currency,
      amount: paymentDetails.amount_total,
      payment_status: paymentDetails.status,
    });
    await paymentDetail.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  stripeCheckout: async (req, res, next) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "New Apple Airpods (3rd Generation)",
                images: [
                  "https://m.media-amazon.com/images/I/615ekapl+pL._SL1500_.jpg",
                ],
              },
              unit_amount: 29900,
            },
            quantity: req.body.quantity,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:4200/success",
        cancel_url: "http://localhost:4200/",
      });
      res.send(session.url);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const products = await stripeProductModels.find({});
      if (products) {
        res.status(200).send(products);
      } else {
        throw error;
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  stripePayment: (request, response) => {
    try {
      let eventType = request.body.type;

      if (eventType === "checkout.session.completed") {
        let paymentDetails = request.body.data.object;
        savePaymentDetails(paymentDetails);
      }

      response.send().end();
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
};

// ./stripe listen --forward-to localhost:5000/product/webhook

// ./stripe trigger payment_intent.succeeded
