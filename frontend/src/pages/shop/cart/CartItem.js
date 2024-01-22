import React from "react";
import Link from "next/link";
import QuantityCounter from "../../../utils/QuantityCounter";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../../redux/features/cart/cartSlice";

const CartItem = ({ product, handleDelete }) => {
  const dispatch = useDispatch();

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    dispatch(
      updateCartItemQuantity({
        productId: product.productId._id,
        quantity: newQuantity,
      })
    );
  };

  // Calculate the total price based on the current quantity
  const calculateTotalPrice = () => {
    if (product.productId.discountPrice !== null) {
      return product.productId.discountPrice * product.quantity;
    } else {
      return product.productId.price * product.quantity;
    }
  };

  // Calculate the initial total price
  const totalPrice = calculateTotalPrice();

  return (
    <tr>
      <td>
        <div
          className="delete-icon"
          onClick={() => handleDelete(product.productId._id)}
        >
          <i className="bi bi-x-lg" />
        </div>
      </td>
      <td data-label="Product" className="table-product">
        <div className="product-img">
          <img
            src={product.productId.images[0].url}
            alt={product.productId.name}
          />
        </div>
        <div className="product-content">
          <h6>
            <Link legacyBehavior href={`/shop/products/${product.productId._id}`}>
              <a>{product.productId.name}</a>
            </Link>
          </h6>
        </div>
      </td>
      <td data-label="Price">
        {product.productId.discountPrice !== null ? (
          <p className="price">
            <del>${product.productId.price.toFixed(2)}</del> $
            {product.productId.discountPrice}
          </p>
        ) : (
          <p className="price">${product.productId.price.toFixed(2)}</p>
        )}
      </td>
      <td data-label="Quantity">
        {product.productId.stock > 0 ? (
          <QuantityCounter
            initialValue={product.quantity}
            onQuantityChange={handleQuantityChange}
            stock={product.productId.stock}
          />
        ) : (
          <span style={{color: '#d94a38'}}>Temporarily out of stock</span>
        )}
      </td>
      <td data-label="Total">${totalPrice.toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
