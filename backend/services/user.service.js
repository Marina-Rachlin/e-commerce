import { redis } from "../utils/redis.js";
import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";

// Get user by id
export const getUserById = async (id, res) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    return user;
  }
};

// Get all users
export const getAllUsersService = async (res) => {
  try {
    const cachedData = await redis.get("allUsers");

    if (cachedData) {
      const users = JSON.parse(cachedData);
      return res.status(200).json({
        success: true,
        source: "cache",
        total: users.length,
        users,
      });
    }

    const users = await userModel.find().sort({ createdAt: -1 });

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found in the database",
      });
    }

    await redis.set("allUsers", JSON.stringify(users), "EX", 25200); // 7 hours

    return res.status(200).json({
      success: true,
      source: "database",
      total: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error accessing the database",
    });
  }
};

// Get all users
// export const getAllUsersService = async (res) => {
//   try {
//     const cachedData = await redis.get("allUsers");

//     if (cachedData) {
//       const users = JSON.parse(cachedData);
//       return res.status(200).json({
//         success: true,
//         source: "cache",
//         total: users.length,
//         users,
//       });
//     }

//     const users = await userModel.find({}, 'name email role addresses.country').sort({ createdAt: -1 });

//     if (!users) {
//       return res.status(404).json({
//         success: false,
//         message: "No users found in the database",
//       });
//     }

//     await redis.set("allUsers", JSON.stringify(users), "EX", 25200); // 7 hours

//     return res.status(200).json({
//       success: true,
//       source: "database",
//       total: users.length,
//       users: users.map(user => ({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         country: user.addresses.length > 0 ? user.addresses[0].country : null
//       })),
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error accessing the database",
//     });
//   }
// };


// Update user role
export const updateUserRoleService = async (res, id, role) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  // Update the corresponding user data in Redis cache
  await redis.set(`user:${id}`, JSON.stringify(user), "EX", 25200); // 7 hours

  res.status(201).json({
    success: true,
    user,
  });
};

//Delete User --- admin only
export const deleteUserByIdService = async (userId) => {
  try {
    if (!isValidObjectId(userId)) {
      return {
        success: false,
        message: "Invalid ID",
      };
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Delete user data from Redis and update allUsers cache
    await redis.del(`user:${user._id}`);

    const cachedData = await redis.get("allUsers");
    if (cachedData) {
      const allUsers = JSON.parse(cachedData);
      const deletedUserIndex = allUsers.findIndex((u) => u._id === userId);

      if (deletedUserIndex) {
        allUsers.splice(deletedUserIndex, 1);
      }
      
      await redis.set("allUsers", JSON.stringify(allUsers));
    }

    await user.deleteOne();

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
