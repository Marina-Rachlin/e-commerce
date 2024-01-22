import GiftSection from "../../../components/common/GiftSection";
import React, { useState, useEffect } from "react";
import { countries } from "countries-list";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "../../../redux/features/cart/cartApi";
import {
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
} from "../../../redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./stripeForm";

const Checkout = () => {
  const { user } = useSelector((state) => state.auth); // for prefilled form fields
  const cart = useSelector((state) => state.cart.items);
  const { subtotal, taxes, shipping, total } = useSelector((state) => state.cart);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [isFormValid, setIsFormValid] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  const defaultValues = {
    firstName: user && user.name ? user.name.split(" ")[0] : "",
    lastName: user && user.name ? user.name.split(" ")[1] : "",
    phone: user && user.phoneNumber ? user.phoneNumber : "",
    email: user && user.email ? user.email : "",
    city:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].city
        : "",
    address:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].address
        : "",
    zipCode:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].postalCode
        : "",
    country:
      user && user.addresses && user.addresses.length > 0
        ? user.addresses[0].country
        : "",
  };

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Postal Code is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (cart && userData?.user) {
      const amount = Math.round(total * 100);
      createPaymentIntent(amount);
    }
  }, [config, cart, userData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  const handlePaymentMethodChange = async (event) => {
    trigger().then((isValid) => {
      if (isValid) {
        const formData = getValues();
        const shippingAddress = {
          country: formData.country,
          city: formData.city,
          address: formData.address,
          postalCode: formData.zipCode,
        };
        setSelectedPaymentMethod(event.target.value);
        setIsFormValid(isValid);
        setShippingAddress(shippingAddress);
      }
    });
  };

  //country options
  const countriesList = Object.values(countries);
  const placeholderOption = (
    <option key="placeholder" value="">
      Choose Country...
    </option>
  );

  const options = [
    placeholderOption,
    ...countriesList.map((country, index) => (
      <option key={index} value={country?.name}>
        {country?.name}
      </option>
    )),
  ];

  return (
    <>
      <div className="checkout-section pt-110 mb-110">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="form-wrap mb-30">
                <h4>Personal Details</h4>
                <form>
                  <div className="row">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-6">
                          <div className="form-inner">
                            <label>First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              {...field}
                              className={`${
                                errors.firstName ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.firstName && (
                              <small className="text-danger">
                                {errors.firstName?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-6">
                          <div className="form-inner">
                            <label>Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              {...field}
                              className={`${
                                errors.lastName ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.lastName && (
                              <small className="text-danger">
                                {errors.lastName?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-6">
                          <div className="form-inner">
                            <label>Mobile (for delivery updates)</label>
                            <input
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              {...field}
                              className={`${
                                errors.phone ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.phone && (
                              <small className="text-danger">
                                {errors.phone?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-6">
                          <div className="form-inner">
                            <label>Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              {...field}
                              className={`${
                                errors.email ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.email && (
                              <small className="text-danger">
                                {errors.email?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <h4 style={{ marginTop: "25px" }}>Delivery Address</h4>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <div className="col-12">
                          <div className="form-inner ">
                            <label>Country</label>
                            <select
                              {...field}
                              className={`${
                                errors.country ? "is-invalid" : ""
                              } nice-select form-select`}
                            >
                              {options}
                            </select>
                            {errors.country && (
                              <small className="text-danger">
                                {errors.country?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-12">
                          <div className="form-inner">
                            <label>City</label>
                            <input
                              type="text"
                              name="city"
                              placeholder="City"
                              {...field}
                              className={`${
                                errors.city ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.city && (
                              <small className="text-danger">
                                {errors.city?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-12">
                          <div className="form-inner">
                            <label>Address</label>
                            <input
                              type="text"
                              name="address"
                              placeholder="Address"
                              {...field}
                              className={`${
                                errors.address ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.address && (
                              <small className="text-danger">
                                {errors.address?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                    <Controller
                      name="postCode"
                      control={control}
                      render={({ field }) => (
                        <div className="col-lg-6">
                          <div className="form-inner">
                            <label>Postal Code</label>
                            <input
                              type="text"
                              name="postCode"
                              placeholder="Postal Code"
                              {...field}
                              className={`${
                                errors.postCode ? "is-invalid" : ""
                              } form-control`}
                            />
                            {errors.postCode && (
                              <small className="text-danger">
                                {errors.postCode?.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: "25px",
                      width: "100%",
                      height: "1px",
                      backgroundColor: "#EEEEEE",
                    }}
                  ></div>
                  <div className="payment-methods mb-30">
                    <h4 style={{ marginTop: "50px" }}>Payment Methods</h4>
                    <ul className="payment-list">
                      <li className="paypal">
                        <label className="form-check payment-check paypal">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={selectedPaymentMethod === "paypal"}
                            onChange={handlePaymentMethodChange}
                          />
                          <span>Paypal</span>
                        </label>
                      </li>
                      <li
                        className="stripe"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <label
                          className="form-check payment-check paypal"
                          style={{ marginBottom: "0" }}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={selectedPaymentMethod === "card"}
                            onChange={handlePaymentMethodChange}
                          />
                          <span>Card</span>
                        </label>
                        <ul
                          className="payment-card-list"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <li>
                            <img
                              src="/assets/img/inner-page/payment-img1.svg"
                              alt="Payment Method 1"
                            />
                          </li>
                          <li>
                            <img
                              src="/assets/img/inner-page/payment-img2.svg"
                              alt="Payment Method 2"
                            />
                          </li>
                          <li>
                            <img
                              src="/assets/img/inner-page/payment-img3.svg"
                              alt="Payment Method 3"
                            />
                          </li>
                          <li>
                            <img
                              src="/assets/img/inner-page/payment-img4.svg"
                              alt="Payment Method 4"
                            />
                          </li>
                          <li>
                            <img
                              src="/assets/img/inner-page/payment-img6.svg"
                              alt="Payment Method 5"
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="place-order-btn">
                    <button type="submit" className="primary-btn1 hover-btn3">
                      Checkout Securely
                    </button>
                  </div> */}
                </form>
                {/* Conditionally render Stripe form */}
                {selectedPaymentMethod === "card" &&
                  isFormValid &&
                  stripePromise &&
                  clientSecret && (
                    <div>
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <StripePaymentForm
                          cart={cart}
                          shippingAddress={shippingAddress}
                          user={user}
                          total={total}
                          shipping={shipping}
                          taxes={taxes}
                        />
                      </Elements>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="added-product-summary mb-30">
                <h5>Order Summary</h5>
                <ul className="added-products">
                  {cart.map((item, index) => (
                    <li key={index} className="single-product">
                      <div className="product-area">
                        <div className="product-img">
                          <img
                            src={item.productId.images[0].url}
                            alt={item.productId.name}
                          />
                        </div>
                        <div className="product-info">
                          <h5>{item.productId.name}</h5>
                          <div className="product-total">
                            <strong>
                              {" "}
                              <span className="product-price px-2">Qty:</span>
                              <span className="product-price">
                                {item.quantity}
                              </span>
                            </strong>
                            <strong>
                              {" "}
                              <i className="bi bi-x-lg px-2" />
                              <span className="product-price">
                                {item.productId.discountPrice !== null
                                  ? item.productId.discountPrice
                                  : item.productId.price}
                                <span
                                  style={{
                                    paddingLeft: "2px",
                                    fontWeight: "400",
                                  }}
                                >
                                  $
                                </span>
                              </span>
                            </strong>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cost-summary mb-30">
                <table className="table cost-summary-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>$ {subtotal}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tax">Shipping Fee</td>
                      <td>$ {shipping} </td>
                    </tr>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>$ {taxes}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="cost-summary total-cost mb-30">
                <table className="table cost-summary-table total-cost">
                  <thead>
                    <tr>
                      <th>Total to Pay</th>
                      <th> $ {total}</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GiftSection />
    </>
  );
};

export default Checkout;
