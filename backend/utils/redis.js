import {Redis} from "ioredis";
import dotenv from 'dotenv';
dotenv.config();


export const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost', 
    port: process.env.REDIS_PORT || 6379,       
    password: process.env.REDIS_PASSWORD, 
    tls: { servername: process.env.REDIS_HOST}, // Include this line for SSL/TLS connections
});

redis.on('connect', () => {
    console.log('Connected to Redis');
  });

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

