import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  subtotal: 0,
  taxes: 0,
  shipping: 0,
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId._id === productId._id);

      if (existingItem) {
        // If the product is already in the cart, update the quantity
        existingItem.quantity += quantity;
      } else {
        state.items.unshift({ productId, quantity });//add to the head of array
      }
      updateCartCalculations(state);
    },
    removeItemFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId._id !== productId);
      updateCartCalculations(state);
    },

    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.productId._id === productId);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        updateCartCalculations(state);
      }
    },

    fetchCartSuccess: (state, action) => {
      state.items = action.payload; // Update cart items with fetched data
      state.loading = false;
      state.error = null;
      updateCartCalculations(state);
    },

    fetchCartFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

// Helper function to calculate subtotal, taxes, shipping, and total
const updateCartCalculations = (state) => {
  state.subtotal = calculateSubtotal(state.items);
  state.taxes = calculateTaxes(state.subtotal);
  state.shipping = calculateShipping(state.subtotal);
  state.total = state.subtotal + state.taxes + state.shipping;
};

const calculateSubtotal = (items) => {
  return items.reduce((acc, item) => {
    const itemPrice = item.productId.discountPrice ?? item.productId.price;
    return acc + itemPrice * item.quantity;
  }, 0);
};

const calculateTaxes = () => {
  return 2;
};

const calculateShipping = (subtotal) => {
  return subtotal < 60 ? 10 : 0;
};


export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  fetchCartSuccess,
  fetchCartFailure,
  emptyCart
} = cartSlice.actions;

export default cartSlice.reducer;
