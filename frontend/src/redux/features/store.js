"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import {addItem } from "./wishlist/wishlistSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import authSlice from "./auth/authSlice";
import toggleSlice from "./toggle/toggleSlice";
import cartSlice from "./cart/cartSlice";
import { wishlistApi } from "./wishlist/wishlistApi";
import {cartApi} from "./cart/cartApi";
import { addItemToCart } from "./cart/cartSlice";
import { emptyCart } from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    toggle: toggleSlice,
    wishlist: wishlistSlice,
    cart: cartSlice
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// call on every page load
const initializeApp = async () => {
  console.log("initialize app");

  // Loading user
  try {
    const response = await store.dispatch(
      apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
  } catch (error) {
    console.error("Error loading user:", error);
  }

// Fetch wishlist data from the server and update the store
try {
  const getWishlistResponse = await store.dispatch(
    wishlistApi.endpoints.getWishlist.initiate({}, { forceRefetch: true })
  );

  if (getWishlistResponse.data) { 
    const wishlistItems = getWishlistResponse.data.products.map((product) => ({
      key: product.productId._id,  
      _id: product.productId._id,
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


// Fetch cart data from the server and update the store
try {
  const getCartResponse = await store.dispatch(
    cartApi.endpoints.getCart.initiate({}, { forceRefetch: true })
  );

  if (getCartResponse.data) {
    const cartItems = getCartResponse.data.cart.map((item) => ({
      productId: item.productId, 
      quantity: item.quantity
    }));

    // If there are items in the cart, dispatch actions to add them to the state
    if (cartItems.length > 0) {
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

initializeApp();

export default store;
