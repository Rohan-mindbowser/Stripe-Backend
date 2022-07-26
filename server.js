const express = require("express");
const app = express();

const stripe = require("stripe")(
  "sk_test_51KEVTYSJiWcFzRnWLURXNYQ40rSmI15hnsqq74HvS3TW5J43VoHwrgDE3dbf5JGzB1aCTXWWW9kn4AMMqFcDXRMh00GsYlcYCN"
);

const bodyParser = require("body-parser");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.post("/checkout", async (req, res) => {
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
    console.log(session);
    res.send(session.url);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => {
  console.log("Running on port 5000..");
});
