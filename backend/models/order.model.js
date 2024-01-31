import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
    shippingAddress:{
        type: Object,
        required: [true, "Please select shipping address!"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Please select payment method!"],
        // enum: ["Credit Card"], 
    },
    paymentInfo: {
        id: String,
        status: String,
        update_time: String,
      },
    taxPrice: {
        type: Number,
        required: true,
        default: 2.0,
      },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
    status:{
        type: String,
        default: "Processing",
        enum:{
            values: ["Processing", "Delivered", "Cancelled", "Pending"],
            message: "Please select correct order status",
        },
    },
    paidAt: {
        type: Date,
      },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
    deliveredAt: {
        type: Date,
      },
    },
    {
      timestamps: true, 
    }
);

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
