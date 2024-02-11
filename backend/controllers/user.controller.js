import dotenv from "dotenv";
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import {
    accessTokenOptions,
    refreshTokenOptions,
    sendToken,
  } from "../utils/jwt.js";
import { redis } from "../utils/redis.js";
import CatchAsyncError from "../middleware/catchAsyncErrors.js";
import {
    getAllUsersService,
    getUserById,
    updateUserRoleService,
    deleteUserByIdService,
  } from "../services/user.service.js";
import {v2 as cloudinary} from "cloudinary"; 
import { isValidObjectId } from "mongoose";

dotenv.config();

// register user
export const register = CatchAsyncError(async (req, res, next) => {

  try {
    const { name, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account!`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); // generates random number between 1000 and 9999 and convert it to a string. 

  const token = jwt.sign( // Creates JWT token with user data and activationCode.
    {
      user,
      activationCode,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// activate user
export const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;

    const newUser = jwt.verify(
      activation_token,
      process.env.JWT_SECRET
    );

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }
    const user = await userModel.create({
      name,
      email,
      password,
    });

    await redis.set(`user:${user._id}`, JSON.stringify(user), "EX", 25200); //set to Redis

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login user
export const login = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 200, res);

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// logout user
export const logout = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    const userId = req.user?._id || "";
    await redis.del(userId);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token
export const updateAccessToken =(async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET
      );
  
      const message = "Could not refresh token";
      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }
      
      const session = await redis.get(decoded.id);
  
      if (!session) {
        return next(
          new ErrorHandler("Please login for access this resources!", 400)
        );
      }
  
      const user = JSON.parse(session);
  
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      );
  
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "3d",
        }
      );
      req.user = user;
  
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);
  
      // await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
  
      return next();

      // res.status(200).json({
      //   success: true,
      // });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });

// get user info
export const getUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const user = await getUserById(userId, res);

    if (user) {
      // Retrieve the access token from cookies
      const accessToken = req.cookies.access_token;

      res.status(201).json({
        success: true,
        user,
        accessToken, // Include the access token in the response
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// social auth
export const socialAuth = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = await userModel.create({ email, name, avatar });
      sendToken(newUser, 200, res);
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update user info
export const updateUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phoneNumber, addresses } = req.body;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    // Update email if provided and not already in use
    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist && isEmailExist._id.toString() !== userId.toString()) {
        return next(new ErrorHandler("Email already in use", 400));
      }

      user.email = email;
    }

    // Update name if provided
    if (name && user) {
      user.name = name;
    }

    // Update phone if provided
    if (phoneNumber && user) {
      user.phoneNumber = phoneNumber;
    }

    // Update addresses if provided
    if (addresses && user) {
      user.addresses = [addresses]; 
    }

    // Save the updated user
    await user?.save();

    // Update the cache with the new user data
    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update user password
export const updatePassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }

    const user = await userModel.findById(req.user?._id).select("+password");

    if (user?.password === undefined) {
      return next(new ErrorHandler("Invalid user", 400));
    }

    const isPasswordMatch = await user?.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    user.password = newPassword;

    await user.save();

    await redis.set(req.user?._id, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update profile picture
export const updateProfilePicture = CatchAsyncError(async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.uploader.destroy(user?.avatar?.public_id);

        const myCloud = await cloudinary.uploader.upload(avatar, {
          folder: "avatars",
           quality: "auto", 
         
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.uploader.upload(avatar, {
          folder: "avatars",
          quality: "auto", 
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
          // url: `${myCloud.secure_url}/q_auto/${myCloud.public_id}.jpg`,
        };
      }
    }

    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get all users --- only for admin
export const getAllUsers = CatchAsyncError(async (req, res, next) => {


  const role = req.query.role || '';

  try {
    await getAllUsersService(role, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// update user role --- only for admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { email, role } = req.body; 
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      const id = isUserExist._id;
      await updateUserRoleService(res, id, role);
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Delete user --- only for admin
export const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = id;
    const result = await deleteUserByIdService(userId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } else {
      return next(new ErrorHandler(result.message, 404));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
