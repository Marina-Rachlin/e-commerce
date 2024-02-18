import React, { useEffect, useState } from "react";
import GiftSection from "../../../components/common/GiftSection";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetCartQuery,
  useDeleteFromCartMutation,
  useFetchLatestProductDataMutation
} from "../../../redux/features/cart/cartApi";
import {
  fetchCartSuccess,
  removeItemFromCart,
} from "../../../redux/features/cart/cartSlice";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import Script from 'next/script';
import Head from "next/head";

const Cart = () => {
  const { isLoading, data, error } = useGetCartQuery();
  const [deleteFromCart] = useDeleteFromCartMutation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const {subtotal, taxes, shipping, total} = useSelector((state) => state.cart);
  const [fetchLatestProductData] = useFetchLatestProductDataMutation();
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState([]);

  // This function will be called after a 300 ms delay if no more remove actions are detected
  const debouncedRemoveFromCart = debounce(async (product) => {
    try {
      await deleteFromCart(product).unwrap();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }, 300);

  const handleRemoveFromCart = async (product) => {
    dispatch(removeItemFromCart(product)); // Update client
    debouncedRemoveFromCart(product);//update server
  };

  //help function for validating the price
  const isPriceChanged = (item, latestItemData) => {
    return (
      item.productId.price !== latestItemData.price ||
      item.productId.discountPrice !== latestItemData.discountPrice
    );
  };

  //sync before let the user to go to checkout
  const synchronizeCartWithServer = async (e) => {
    e.preventDefault();
    let isValid = true;
    let errorMessages = [];
    const productIds = cart.map((item) => item.productId._id);
    let latestProductData;

    const result = await fetchLatestProductData(productIds);
    if ("data" in result) {
      latestProductData = result.data.products;
    }

    const updatedCart = cart.reduce((acc, item) => {
      const updatedProduct = latestProductData.find(
        product => product._id === item.productId._id
      );
  
      if (!updatedProduct) {
        errorMessages.push(`Item ${item.productId.name} is no longer available.`);
        isValid = false;
      } else {
        const newItem = { ...item, productId: updatedProduct };
  
        if (item.quantity > updatedProduct.stock) {
          isValid = false;
          errorMessages.push(
            `Item ${updatedProduct.name} is not available in the requested quantity (only ${updatedProduct.stock} left). Adjusted to maximum available.`
          );
          newItem.quantity = updatedProduct.stock;
        }
  
        if (isPriceChanged(item, updatedProduct)) {
          isValid = false;
          errorMessages.push(
            `The price of item ${updatedProduct.name} has changed. Updated to the latest price.`
          );
          newItem.price = updatedProduct.price;
        }
  
        acc.push(newItem);
      }
      return acc;
    }, []);

    setErrorMessages(errorMessages);

    if (updatedCart.length === 0) {
      // dispatch(setCartEmpty(true)); // If the updated cart is empty
    } else {
      dispatch(fetchCartSuccess(updatedCart));
    }
  
    if (isValid) {
      router.push("/shop/checkout");
    }
  };

  return (
    <>
        <Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-81GLR4VQK9"></Script>
    <Script>
      {
        ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-81GLR4VQK9');`
      }
    </Script>
    </Head>
      <div className="whistlist-section cart mt-110 mb-110">
        <div className="container">
        {errorMessages.length > 0 && (
      <div className="attention-messages">
        {errorMessages.map((message, index) => (
          <div className="attention-message" key={index}>
            <span className="attention-icon">ℹ️</span> 
            {message}
          </div>
        ))}
      </div>
    )}
          {cart.length === 0 && !isLoading ? (
            <div className="cart-empty-message">
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="row mb-50">
                <div className="col-12">
                  <div className="whistlist-table">
                    <table className="eg-table2">
                      <thead>
                        <tr>
                          <th />
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart?.map((item) => (
                          <CartItem
                            key={item._id}
                            product={item}
                            handleDelete={handleRemoveFromCart}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="coupon-area">
                    <div className="cart-coupon-input">
                      <h5>Coupon Code</h5>
                      <form>
                        <div className="form-inner">
                          <input type="text" placeholder="Coupon Code" />
                          <button
                            type="submit"
                            className="primary-btn1 hover-btn3"
                          >
                            Apply Code
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Cart Totals</th>
                        <th />
                        <th>${subtotal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fees & Taxes</td>
                        <td>
                          <ul className="cost-list text-start">
                            <li>Shipping Fee</li>
                            <li>Taxes</li>
                            <li style={{ fontWeight: "400", color: "orange" }}>
                              Free Shipping For Orders Over $30{" "}
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul className="single-cost text-center">
                            <li>${shipping.toFixed(2)}</li>
                            <li>${taxes.toFixed(2)}</li>
                            <li />
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>Total to Pay</td>
                        <td />
                        <td>${total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    className="primary-btn1 hover-btn3"
                    onClick={synchronizeCartWithServer}
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <GiftSection />
    </>
  );
};

export default Cart;
