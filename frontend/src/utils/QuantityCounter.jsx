import React from "react";
import useQuantityCounter from "../hooks/useQuantityCounter";

function QuantityCounter({ onQuantityChange, initialValue, stock }) {
  const { quantity, increment, decrement, handleInputChange } = useQuantityCounter(initialValue);


  // Pass the updated quantity to the parent component
  const handleQuantityChange = (newQuantity) => {
    // Ensure the new quantity is at least 1
    const validQuantity = Math.max(newQuantity, 1);
    onQuantityChange(validQuantity);
  };

  return (
    <div className="quantity-counter">
      <div
        className="quantity__minus"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (quantity > 1) {
            decrement();
            handleQuantityChange(quantity - 1); 
          }
        }}
      >
        <i className="bx bx-minus" />
      </div>
      <input
        name="quantity"
        type="text"
        className="quantity__input"
        value={quantity}
        onChange={(e) => {
          const newQuantity = parseInt(e.target.value, 10);
          handleInputChange(newQuantity);
          handleQuantityChange(newQuantity); 
        }}
      />
      <div
        className="quantity__plus"
        style={{ cursor: "pointer" }}
        onClick={() => {
          increment();
          handleQuantityChange(quantity + 1);
        }}
      >
        <i className="bx bx-plus" />
      </div>
    </div>
  );
}

export default QuantityCounter;
