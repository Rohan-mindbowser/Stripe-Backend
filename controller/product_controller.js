module.exports = {
  stripeCheckout: async (req, res, next) => {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "T-shirt",
              },
              unit_amount: 40000,
            },
            quantity: 2,
          },
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Levis T-shirt",
              },
              unit_amount: 40000,
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
};
