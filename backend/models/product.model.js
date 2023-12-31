import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Please enter your product brand!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
      min: 0,
    },
    price: {
      type: Number,
      required: [true, "Please enter your product price!"],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [reviewSchema],
    ratings:{
        type: Number,
        default: 0,
    },
    purchased:{
        type: Number,
        default: 0,
        },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
