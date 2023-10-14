import express from "express";
import {
  addReplyToReview,
  addReview,
  deleteProduct,
  generateVideoUrl,
  getAdminAllCourses,
  getAllProducts,
  getSingleProduct,
  uploadProduct,
  updateProduct,
  getOutOfStockProducts
} from "../controllers/product.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";

const productRouter = express.Router();

productRouter.post("/create-product", isAuthenticated, authorizeRoles("admin"), uploadProduct);

productRouter.put("/update-product/:id", isAuthenticated, authorizeRoles("admin"),updateProduct);

productRouter.get("/get-product/:id", getSingleProduct);

productRouter.get("/get-products", cacheMiddleware, getAllProducts);

productRouter.delete("/delete-product/:id", isAuthenticated, authorizeRoles("admin"), deleteProduct);

productRouter.put("/add-review/:id", isAuthenticated, addReview);

productRouter.get("/get-out-of-stock-products", isAuthenticated, authorizeRoles("admin"), getOutOfStockProducts);








productRouter.get(
  "/get-admin-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminAllCourses
);

productRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

productRouter.post("/getVdoCipherOTP", generateVideoUrl);

export default productRouter;
