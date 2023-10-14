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


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true, limit: "50mb"}))
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));

// routes
app.use(
  userRouter,
  productRouter,
  orderRouter,
  notificationRoute,
  analyticsRouter,
  layoutRouter
);

// middleware calls
// app.use(limiter);
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
  
// api requests limit
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000,
// 	max: 100, 
// 	standardHeaders: 'draft-7', 
// 	legacyHeaders: false, 
// })
 
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
const server = app.listen(process.env.PORT || 3030, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})



// import http from "http";
// import { initSocketServer } from "./socketServer";
// const server = http.createServer(app);


// initSocketServer(server);
// import { rateLimit } from 'express-rate-limit'