import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";
import CartModel from "../models/cart.model.js";
import { redis } from "../utils/redis.js";
import productModel from "../models/product.model.js"

// get user's cart
export const getCart = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    let source;

    // Try fetching cart from Redis cache
    let cart = await redis.get(`cart_${userId}`);

    if (cart) {
      cart = JSON.parse(cart);
      source = "cache";
    } else {
      // Fetch from database
      cart = await CartModel.findOne({ userId }).populate({
        path: "items.productId",
        select: "name images discountPrice price stock",
      });

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      await redis.set(`cart_${userId}`, JSON.stringify(cart)); //update cache
      source = "database";
    }

    // Reverse the products array
    const reversedCart = cart.items.reverse();

    // Calculate cart totals
    const { total, subtotal, taxes, shipping } = calculateCartTotal(cart);

    return res.status(200).json({
      source: source,
      cart: reversedCart,
      total,
      subtotal,
      taxes,
      shipping,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Calculate cart total
const calculateCartTotal = (cart) => {
  const subtotal = cart?.items.reduce((acc, item) => {
    const itemPrice =
      item.productId.discountPrice !== null
        ? item.productId.discountPrice
        : item.productId.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const shipping = subtotal < 60 ? 10 : 0; // $10 or $0
  const taxes = 2; // $2
  const total = subtotal + shipping + taxes;

  return { total, subtotal, taxes, shipping };
};

//Add to cart
export const addToCart = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await CartModel.findOne({ userId });
    const { productId, quantity } = req.body.data;

    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId._id.toString() === productId._id.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    console.log("cart saved");

    // Re-fetch the cart with populated product details
    const populatedCart = await CartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "name images discountPrice price stock",
    });

    // Update Redis cache with the populated cart
    await redis.set(`cart_${userId}`, JSON.stringify(populatedCart));

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: populatedCart,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Remove from cart
export const removeFromCart = CatchAsyncError(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    let cart = await CartModel.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
      await cart.save();

      // Re-fetch the cart with populated product details
      const populatedCart = await CartModel.findOne({ userId }).populate({
        path: "items.productId",
        select: "name images discountPrice price stock",
      });

      // Update Redis cache
      await redis.set(`cart_${userId}`, JSON.stringify(populatedCart));

      res.status(200).json({ message: "Item removed from cart", populatedCart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// fetchLatestProductData
export const fetchLatestProductData = CatchAsyncError(async (req, res, next) => {
  const productIds = req.body;

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return next(new ErrorHandler("Invalid product IDs", 400));
  }

  try {
    const products = await productModel.find({ _id: { $in: productIds } }).select("name stock price discountPrice images");

    if (products.length === 0) {
      return next(new ErrorHandler("Products not found", 404));
    }

    res.status(200).json({success: true,products});
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

