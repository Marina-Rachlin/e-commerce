import React, { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import store from "../../redux/features/store";

// Fetch wishlist data from the server and update the store
const fetchWishlistData = async (store) => {
  try {
    const getWishlistResponse = await store.dispatch(
      wishlistApi.endpoints.getWishlist.initiate({}, { forceRefetch: true })
    );

    if (getWishlistResponse.data) {
      const wishlistItems = getWishlistResponse.data.products.map((product) => ({
        id: product.productId._id,
        name: product.productId.name,
        stock: product.productId.stock,
        price: product.productId.price,
        discountPrice: product.productId.discountPrice,
        images: product.productId.images,
      }));

      // Dispatch the addItem action to add wishlist items to the store
      wishlistItems.forEach((item) => {
        store.dispatch(addItem(item));
      });
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }
};

// Fetch cart data from the server and update the store
const fetchCartData = async (store) => {
  try {
    const getCartResponse = await store.dispatch(
      cartApi.endpoints.getCart.initiate({}, { forceRefetch: true })
    );

    if (getCartResponse.data) {
      const cartItems = getCartResponse.data.cart.map((item) => ({
        productId: item.productId, // Assuming this includes necessary product details
        quantity: item.quantity,
      }));

      // If there are items in the cart, dispatch actions to add them to the state
      if (cartItems.length > 0) {
        // First, empty the cart to ensure it's initialized from a clean state
        store.dispatch(emptyCart());

        // Then, add each item to the cart
        cartItems.forEach((item) => {
          store.dispatch(addItemToCart(item));
        });
      }
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

const Login = ({ handleTabChange, name}) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const[login, {isSuccess, error}] = useLoginMutation();
  const {refetch} = useLoadUserQuery(undefined,{});

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(6)
  });

  const defaultValues = {
    email: "",
    password: ""
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    await login(data);
  }

useEffect(() => {
  if (isSuccess) {
    toast.success("Login Successfully!", {duration: 2000});
    // setOpen(false);
   refetch(); 
   fetchWishlistData(store); // Fetch wishlist data after successful login
   fetchCartData(store);
  }
  if (error) {
    if ("data" in error) {
   toast.error(error.data.message)
    }
  }
}, [isSuccess, error]);

  return (
    <div className={name} id="login" role="tabpanel" aria-labelledby="login-tab">
      <div className="login-registration-form">
        <div className="form-title">
          <h3>Log In</h3>
        </div>

        <div className="demo-credentials">
        <p><strong>Email:</strong> admin@gmail.com</p>
        <p><strong>Password:</strong> 123456</p>
      </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-inner mb-35">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email Here *"
                  className={`${errors.email ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="form-inner mb-25">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  className={`${errors.password ? "is-invalid" : ""} form-control`}
                />
              )}
            />
            <i
              className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
              style={{ bottom: errors.password ? "35px" : "13px" }}
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="primary-btn1 hover-btn3">
            Log In
          </button>

          <div className="member d-flex justify-content-center align-items-center">
            <p>Not a member yet?
                 <a href="#" onClick={() => handleTabChange("registration")}> Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
