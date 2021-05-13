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

exports.api = functions.https.onRequest(app);
