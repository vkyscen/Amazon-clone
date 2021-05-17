import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect, forwardRef } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import { getTotalBasketPrice } from "../reducer";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./Components/CheckoutProduct";
import axios from "../axios";
import { db } from "../firebase";
import FlipMove from "react-flip-move";

import "./Payment.css";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const FunctionalCheckoutProduct = forwardRef((props, ref) => (
    <div ref={ref}>
      <CheckoutProduct
        id={props.id}
        title={props.title}
        image={props.image}
        rating={props.rating}
        price={props.price}
      />
    </div>
  ));

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getTotalBasketPrice(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  console.log("ussssserr", user.uid);
  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout(<Link>{basket?.length} items</Link>)
        </h1>
        {/*Delivery Address Section */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-adress">
            <p>{user?.email} </p>
            <p>123 Cidar avenue</p>
            <p>Chennai,TN</p>
          </div>
        </div>

        {/*Review Items Section */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment-items">
            <FlipMove>
              {basket.map((item) => (
                <FunctionalCheckoutProduct
                  // key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                />
              ))}
            </FlipMove>
          </div>
        </div>

        {/*Payment Method Section */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: : {value}</h3>}
                  decimalScale={2}
                  value={getTotalBasketPrice(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
