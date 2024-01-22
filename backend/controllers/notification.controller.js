import notificationModel from "../models/notification.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";
import { redis } from "../utils/redis.js";
import cron from "node-cron";

// get all notifications --- only admin
export const getAdminNotifications = CatchAsyncError(async (req, res, next) => {
  try {
    // Check if notifications are cached
    // const cachedData = await redis.get("adminNotifications");

    // if (cachedData) {
    //   const adminNotifications = JSON.parse(cachedData);
    //   return res.status(200).json({
    //     success: true,
    //     source: "cache",
    //     total: adminNotifications.length,
    //     adminNotifications,
    //   });
    // }

    // If not cached, retrieve notifications from the database
    const adminNotifications = await notificationModel
      .find()
      .sort({ createdAt: -1 });

    // Cache the notifications for future use
    await redis.set(
      "adminNotifications",
      JSON.stringify(adminNotifications),
      "EX",
      3600
    ); // 1 hour

    res.status(200).json({
      success: true,
      source: "database",
      total: adminNotifications.length,
      adminNotifications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// update notification status --- only admin
export const updateNotification = CatchAsyncError(
  async (req, res, next) => {
    try {
      const notificationId = req.params.id;
      const { read } = req.body;

      if (!isValidObjectId(notificationId)) {
        return next(new ErrorHandler("Invalid order ID", 400));
      }

      // Find the notification in DB
      const notification = await notificationModel.findById(notificationId);

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      }

      notification.read = read; // update in DB
      await notification.save();

      // Update the cached document selectively
      const cachedData = await redis.get("adminNotifications");

      if (cachedData) {
        const adminNotifications = JSON.parse(cachedData);
        const updatedNotificationIndex = adminNotifications.findIndex((n) => n._id === notificationId);

        if (updatedNotificationIndex) {
        //   adminNotifications[updatedNotificationIndex].read = read;
        adminNotifications.splice(updatedNotificationIndex, 1);

          await redis.set("adminNotifications", JSON.stringify(adminNotifications), "EX", 3600);//1 hour
        }
      }

      res.status(200).json({
        success: true,
        message: "Notification status was updated successfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// delete notification --- only admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({
    read: "true",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Deleted read notifications");
});
