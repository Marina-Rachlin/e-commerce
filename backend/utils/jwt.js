import dotenv from "dotenv"; 
import { redis } from "./redis.js"; 

dotenv.config();

// Parse environment variables to integers with fallback values (because sometimes env not working)
//(Using parseInt ensures that the value we get is always a number (integer), even if the environment variable is set to something unexpected(non-numeric values or numbers in a different base))
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);

// options for cookies
export const accessTokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 1000), // Set the token expiration time (in milliseconds)
  maxAge: accessTokenExpire * 60 * 1000, 
  httpOnly: true, 
  sameSite: "none", 
  secure: true, 
};

export const refreshTokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000), 
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000, 
  httpOnly: true, 
  sameSite: "none", 
  secure: true, 
};

// Define a function to grant tokens to the client
export const sendToken = async (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
await redis.set(user._id, JSON.stringify(user));

  // Set the "access_token" and "refresh_token" cookies in the response
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Send a JSON response to the client with the user, access token, and success status
  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
    refreshToken
  });
};


