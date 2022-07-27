const stripeProductModels = require("../models/stripeProductModel");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://www.google.com/",
        cancel_url: "https://github.com/",
      });
      //   console.log(session);
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
};
