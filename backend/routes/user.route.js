import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  login,
  logout,
  register,
  socialAuth,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
  updateAccessToken,
} from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", login);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/logout", updateAccessToken, isAuthenticated, logout);

userRouter.get("/me",updateAccessToken, isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info",updateAccessToken,  isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password",updateAccessToken, isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", updateAccessToken, isAuthenticated, updateProfilePicture);

userRouter.get("/get-users", updateAccessToken, isAuthenticated, authorizeRoles("admin"), getAllUsers);

userRouter.put("/update-user",updateAccessToken, isAuthenticated, authorizeRoles("admin"),updateUserRole);

userRouter.delete("/delete-user/:id",updateAccessToken, isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
