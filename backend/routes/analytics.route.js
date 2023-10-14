import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { getProductsAnalytics, getOrderAnalytics, getUsersAnalytics } from "../controllers/analytics.controller.js";

const analyticsRouter = express.Router();

analyticsRouter.get("/get-users-analytics", isAuthenticated, authorizeRoles("admin"), getUsersAnalytics);

analyticsRouter.get("/get-orders-analytics", isAuthenticated, authorizeRoles("admin"), getOrderAnalytics);

analyticsRouter.get("/get-products-analytics", isAuthenticated, authorizeRoles("admin"), getProductsAnalytics);

export default analyticsRouter;
