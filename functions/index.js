const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const token = require("./StripeToken");
const stripe = require("stripe")(token);

// app config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(express.json());

// api routes

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello world");
});

app.post("/payments/create", (req, res) => {
  const total = req.query.total;
  console.log("payment received of ", total);

  const paymentIntent = stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  return paymentIntent
      .then((e) => {
      // 201 is used when everything is ok but u created something
        return res.status(201).send({
          clientSecret: e.client_secret,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.sendStatus(404);
      });
});
exports.api = functions.https.onRequest(app);

// local api
// http://localhost:5001/clone-42a44/us-central1/api
