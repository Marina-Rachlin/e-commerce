import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/features/cart/cartSlice";
import { useUpdateCartMutation } from "../../../redux/features/cart/cartApi";
import { debounce } from 'lodash'; 


const WishlistItem = ({ product, handleDelete }) => {
  const dispatch = useDispatch();
  const [updateCart] = useUpdateCartMutation();

  //Adding to cart
  const debouncedUpdateCart = debounce(async (product) => {
    const quantity = 1;
    await updateCart({ productId: product, quantity });
  }, 300); //3 sec

  const handleAddToCart = (product) => {
    const quantity = 1;
    dispatch(addItemToCart({ productId: product, quantity }));//update state
    debouncedUpdateCart(product);//update server
  };

  return (
    <tr>
      <td>
        <div className="delete-icon" onClick={() => handleDelete(product.id)}>
          <i className="bi bi-x-lg" />
        </div>
      </td>
      <td data-label="Product" className="table-product">
        <div className="product-img">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="product-content">
          <h6>
            <Link legacyBehavior href="/shop/product-default">
              <a>{product.name}</a>
            </Link>
          </h6>
        </div>
      </td>
      <td data-label="Price">
        {product.discountPrice !== null ? (
          <p className="price">
            <del>${product.price}</del> ${product.discountPrice}
          </p>
        ) : (
          <p className="price">${product.price}</p>
        )}
      </td>
      <td data-label="Stock">
        <span>{product.stock}</span>
      </td>
      <td>
        <button className="add-cart-btn hover-btn2" onClick={(() => {handleAddToCart(product)})}>
          <i className="bi bi-bag-check" />
          Add To Cart
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
