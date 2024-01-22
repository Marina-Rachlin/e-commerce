import express from "express";
import {
    wishlistAdd,
    getWishlist,
    wishlistDelete
} from "../controllers/wishlist.controller.js";
import {isAuthenticated } from "../middleware/auth.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";
import { updateAccessToken } from "../controllers/user.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/wishlist", updateAccessToken, isAuthenticated, wishlistAdd);
wishlistRouter.get("/wishlist", updateAccessToken, isAuthenticated, getWishlist);
wishlistRouter.delete("/wishlist/:productId", updateAccessToken, isAuthenticated, wishlistDelete);

export default wishlistRouter