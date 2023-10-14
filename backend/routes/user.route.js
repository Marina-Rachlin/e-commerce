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
} from "../controllers/user.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", login);

userRouter.get("/logout", isAuthenticated, logout);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);

userRouter.put("/update-user-password", isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

userRouter.get("/get-users", isAuthenticated, authorizeRoles("admin"), getAllUsers);

userRouter.put("/update-user", isAuthenticated, authorizeRoles("admin"),updateUserRole);

userRouter.delete("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default userRouter;
