import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  createOrder,
  getAllOrders,
  getOrderDetails,
  getMyOrders,
  getOrdersByUserIdForAdmin,
  getOrderDetailsUser,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", updateAccessToken, isAuthenticated, createOrder);

orderRouter.get("/get-orders", updateAccessToken, isAuthenticated, authorizeRoles("admin"),getAllOrders);

orderRouter.get("/getOrderDetails/:id", updateAccessToken, isAuthenticated, getOrderDetails);

orderRouter.get("/me/orders", updateAccessToken, isAuthenticated, getMyOrders);

orderRouter.get("/me/orders/:id", updateAccessToken,  isAuthenticated, getOrderDetailsUser);

orderRouter.get("/admin/orders/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), getOrdersByUserIdForAdmin);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", updateAccessToken, isAuthenticated, newPayment);

export default orderRouter;