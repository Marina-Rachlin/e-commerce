import express from 'express';
import {isAuthenticated} from '../middleware/auth.js';
import { updateAccessToken } from '../controllers/user.controller.js';
import { addToCart, getCart, removeFromCart, fetchLatestProductData } from '../controllers/cart.controller.js';


const cartRouter = express.Router();

cartRouter.post('/cart', updateAccessToken, isAuthenticated, addToCart);
cartRouter.get('/cart', updateAccessToken, isAuthenticated, getCart);
cartRouter.delete('/cart/:productId', updateAccessToken, isAuthenticated, removeFromCart );
cartRouter.post('/fetch-latest-product-data', fetchLatestProductData)

export default cartRouter