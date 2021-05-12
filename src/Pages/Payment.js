import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./Components/CheckoutProduct";
import "./Payment.css";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
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
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>

        {/*Payment Method Section */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details"></div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
