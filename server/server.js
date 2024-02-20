const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const key = require('../environments/environments')
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow requests from your Angular app's origin
const allowedOrigins = ["http://localhost:4200"]; // Add your Angular app's origin(s) here
app.use(cors({ origin: allowedOrigins, credentials: true }));

const stripe = require("stripe")(
  key.keyValues.stripeKey
);

app.post("/checkout", async (req, res, next) => {
  console.log(req.body)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map((item) => ({    
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
          
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4200/home",
      cancel_url: "http://localhost:4242/cancel.html",
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("app is running on 4242"));