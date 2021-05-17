import React, { forwardRef } from "react";
import { useStateValue } from "../StateProvider";
import "./Checkout.css";
import CheckoutProduct from "./Components/CheckoutProduct";
import Subtotal from "./Components/Subtotal";
import FlipMove from "react-flip-move";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  //for animations
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
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img
          className="checkout-ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello,{user?.email}</h3>
          <h2 className="checkout-title">Your Shopping Basket</h2>
          {/* checkout product */}

          <FlipMove>
            {basket.map((item) => (
              <FunctionalCheckoutProduct {...item} />
            ))}
          </FlipMove>
        </div>
      </div>

      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
