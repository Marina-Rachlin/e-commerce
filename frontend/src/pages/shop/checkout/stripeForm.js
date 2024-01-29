import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "../../../redux/features/orders/orderApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { toast } from "react-hot-toast";
import socketIO from "socket.io-client";
import { emptyCart } from "../../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });


export default function CheckoutForm({
  cart,
  shippingAddress,
  user,
  total,
  shipping,
  taxes,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {refetch} = useLoadUserQuery(undefined,{});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({
        cart,
        shippingAddress,
        total,
        shipping,
        taxes,
        payment_info: paymentIntent,
      });
      toast.success("Order created successfully!", {
        duration: 7000,
      });
      dispatch(emptyCart());
      router.push('/shop/my-account?tab=orders');
    }
  };

  useEffect(() => {
    if (orderData) {
       refetch();
      socketId.emit("notification", {
        title: "New Order",
        message: "You have a new order.",
        userId: user._id,
        type: "order",
      });
    }
    if (error) {
      if ("data" in error) {
        toast.error(error.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
      <PaymentElement id="payment-element" />
      <div className="place-order-btn">
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="primary-btn1 hover-btn3"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
      </div>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
