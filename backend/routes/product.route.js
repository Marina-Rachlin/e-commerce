import express from "express";
import {
  addReplyToReview,
  addReview,
  deleteProduct,
  getAllProducts,
  getAllProductsShop,
  getSingleProduct,
  uploadProduct,
  updateProduct,
  getAllBrands
} from "../controllers/product.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const productRouter = express.Router();

productRouter.post("/create-product", updateAccessToken, isAuthenticated, authorizeRoles("admin"), uploadProduct);

productRouter.put("/update-product/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"),updateProduct);

productRouter.get("/get-product/:id", getSingleProduct);

productRouter.get("/get-products", cacheMiddleware, getAllProducts);

productRouter.get("/get-products-shop", cacheMiddleware, getAllProductsShop);

productRouter.get("/get-brands", cacheMiddleware, getAllBrands);

productRouter.delete("/delete-product/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteProduct);

productRouter.put("/add-review/:id", updateAccessToken, isAuthenticated, addReview);

productRouter.put("/add-review/:id", updateAccessToken, isAuthenticated, addReview);

productRouter.put("/add-reply", updateAccessToken, isAuthenticated, authorizeRoles("admin"), addReplyToReview);

export default productRouter;
