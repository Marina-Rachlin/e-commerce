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
    // console.log(response);
  } catch (error) {
    console.error("Error loading user:", error);
  }

  // Fetch wishlist data from the server and update the store
  try {
    const getWishlistResponse = await store.dispatch(
      wishlistApi.endpoints.getWishlist.initiate({}, { forceRefetch: true })
    );

    if (getWishlistResponse.data) { //received data from server
      const wishlistItems = getWishlistResponse.data.products.map((product) => ({
        id: product.productId._id,
        name: product.productId.name,
        stock: product.productId.stock > 0 ? "In Stock" : "Out of Stock",
        price: product.productId.price,
        discountPrice: product.productId.discountPrice,
        images: product.productId.images,
      }));

      // Dispatch the addItem action to add wishlist items to the store
      wishlistItems.forEach((item) => {
        // Check if the item is already in the state to avoid duplicates
        const isItemInState = store
          .getState()
          .wishlist.wishlist.some((stateItem) => stateItem.id === item.id);

        if (!isItemInState) {
          store.dispatch(addItem(item));
        }
        store.dispatch(addItem(item));
      });
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }
};


initializeApp();

export default store;
