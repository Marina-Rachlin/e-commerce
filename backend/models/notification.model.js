import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // status: {
  //   type: String,
  //   required: true,
  //   default: 'unread',
  // },
  read: {
    type: Boolean,
    default: false,
    required: true,
  },
}, { timestamps: true });

const notificationModel = mongoose.model('Notification', notificationSchema);

export default notificationModel;
