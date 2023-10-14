import ErrorHandler from "../utils/ErrorHandler.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";

// get users analytics --- only for admin
export const getUsersAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await generateLast12MonthsData(userModel);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get products analytics --- only for admin
export const getProductsAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const products = await generateLast12MonthsData(productModel);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get order analytics --- only for admin
export const getOrderAnalytics = CatchAsyncError(async (req, res, next) => {
  try {
    const orders = await generateLast12MonthsData(orderModel);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
