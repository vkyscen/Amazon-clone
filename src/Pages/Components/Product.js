import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Product.css";
const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("thisi is baskre", basket);
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id: id, title: title, image: image, price: price, rating },
    });
  };
  return (
    <div className="product">
      {/* <div className="product-sub"> */}
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
      {/* </div> */}
    </div>
  );
};

export default Product;
