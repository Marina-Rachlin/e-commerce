import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";
import { redis } from "../utils/redis.js";
import WishlistModel from "../models/wishlist.model.js";

//add to wishlist
export const wishlistAdd = CatchAsyncError(async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    if (!isValidObjectId(productId)) {
      return next(new ErrorHandler("Invalid productId", 400));
    }

    const existingWishlist = await WishlistModel.findOne({ userId });

    if (!existingWishlist) {
      const newWishlist = new WishlistModel({
        userId,
        products: [{ productId }],
      });
    
      await newWishlist.save();

    } else {
      // If the user already has a wishlist, check if the product exists
      const productExists = existingWishlist.products.some(
        (product) => product.productId.toString() === productId
      );

      if (!productExists) {
        existingWishlist.products.push({ productId });
        await existingWishlist.save();
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get user's wishlist
export const getWishlist = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const wishlist = await WishlistModel.findOne({ userId }).populate({
      path: "products.productId",
      select: "name images discountPrice price stock",
    });

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    // Reverse the products array
    const reversedProducts = wishlist.products.reverse();

    return res.status(200).json({ products: reversedProducts });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//delete product from wishlist
export const wishlistDelete = CatchAsyncError(async(req, res, next) => {
  try {
    const userId = req.user._id;
    const {productId} = req.params;

    const wishlist = await WishlistModel.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.productId.toString() !== productId
    );

    await wishlist.save();

    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

