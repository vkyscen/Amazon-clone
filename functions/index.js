const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IqGAaSBQm2gWYnjaDLN3u3tyfLMHPKnMrfysAZ7sMKBDkklru0TSmWhNPzpBzny4cD2bi3KdkwarhuOLeeldOVu00tp2Tyn8R"
);

//app config
const app = express();

//middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//api routes

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello world");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("payment received of ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  //201 is used when everything is ok but u created something
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api = functions.https.onRequest(app);

//local api
//http://localhost:5001/clone-42a44/us-central1/api
