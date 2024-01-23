import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/order.route.js";
import analyticsRouter from "./routes/analytics.route.js";
import notificationRoute from "./routes/notification.route.js";
import {v2 as cloudinary} from "cloudinary";
import layoutRouter from "./routes/layout.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import cartRouter from "./routes/cart.route.js";
import http from "http";
import { initSocketServer } from "./socketServer.js";
// import path from "path";
import { rateLimit } from 'express-rate-limit'


const app = express();
const server = http.createServer(app);//use an HTTP server which is compatible with Socket.io
initSocketServer(server);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());

//cors => cross origin resource sharing
// app.use(cors({
//   origin: process.env.ORIGIN,
//   credentials: true,
// }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// api requests limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

// routes
app.use(
  userRouter,
  productRouter,
  orderRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter,
  wishlistRouter,
  cartRouter,
);

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);

// connect db
connectDB();

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
  });

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});   
 
// testing api
app.get("/test", (req, res, next) => {
    res.status(200).json({
      succcess: true,
      message: "API is working",
    });
  });

// unknown route
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.CLOUD_API_KEY,
 api_secret: process.env.CLOUD_SECRET_KEY,
});
 
//server  
 server.listen(process.env.PORT || 3030, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

// const __dirname = path.resolve();

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(express.static(path.join(__dirname, "../frontend/client/build")));

// All other GET requests not handled before will return our React app
// app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "../frontend/client/build", "index.html"));
// });