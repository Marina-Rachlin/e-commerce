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
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get("/get-orders",isAuthenticated, authorizeRoles("admin"),getAllOrders);

orderRouter.get("/getOrderDetails/:id", isAuthenticated, getOrderDetails);

orderRouter.get("/me/orders", isAuthenticated, getMyOrders);

orderRouter.get("/me/orders/:id", isAuthenticated, getOrderDetailsUser);

orderRouter.get("/admin/orders/:id", isAuthenticated, authorizeRoles("admin"), getOrdersByUserIdForAdmin);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;