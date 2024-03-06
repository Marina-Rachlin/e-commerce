import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { redis } from "../utils/redis.js";
// import NotificationModel from "../models/notification.Model";
import productModel from "../models/product.model.js";
import { clearCacheKeys } from "../utils/cacheUtils.js";
import { isValidObjectId } from "mongoose";
import {
  getAllProductsService,
  createProduct,
  getAllProductsShopService,
} from "../services/product.service.js";
import notificationModel from "../models/notification.model.js";
// import { createProduct } from "../services/product.service.js";
// import { getAllProductsShopService } from "../services/product.service.js";

// create product (only for admin)
export const uploadProduct = CatchAsyncError(async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].dataURL, {
        folder: "products",
        transformation: [{ width: 648, height: 238, crop: "fill" }],
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    const productData = req.body;
    productData.images = imagesLinks;

    createProduct(productData, res, next);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Products Admin
export const getAllProducts = CatchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 24;
    const category = req.query.category || "";
    const brand = req.query.brand || "";
    const stock = req.query.stock || "";
    const value = req.query.value || "";
    const context = req.query.context || "";

    // Call the service function with pagination parameters
    const result = await getAllProductsService(
      page,
      pageSize,
      category,
      brand,
      stock,
      value,
      context,
      req
    );

    res.status(200).json({
      success: true,
      source: result.source,
      products: result.products,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalProducts: result.totalProducts,
    });
  } catch (error) {
    if (error.message === "No products found in the database") {
      return res.status(404).json({
        success: false,
        message: "No products found in the database",
      });
    }
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get All Products Shop
export const getAllProductsShop = CatchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;
  const sort = req.query.sort || "";
  const brand = req.query.brand || "";
  const category = req.query.category || "";

    // Parse the price parameter
    const priceParam = req.query.price || "";
    const [minPrice, maxPrice] = priceParam.split('-').map(parseFloat);

  try {
    const result = await getAllProductsShopService(
      page,
      pageSize,
      sort,
      brand,
      category,
      minPrice,
      maxPrice,
      req
    );
    res.status(200).json({
      success: true,
      source: result.source,
      products: result.products,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
      totalProducts: result.totalProducts,
      topRated: result.topRated,
      mostPopular: result.mostPopular
    });
  } catch (error) {
    {
      if (error.message === "No products found in the database") {
        return res.status(404).json({
          success: false,
          message: "OOPs...It looks like something went wrong :( ",
        });
      }
      return next(new ErrorHandler(error.message, 500));
    }
  }
});

// get single product
export const getSingleProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!isValidObjectId(productId)) {
      return next(new ErrorHandler("Invalid product ID", 400));
    }

    // const isCacheExist = await redis.get(productId);
    let isCacheExist;

    if (isCacheExist) {
      const product = JSON.parse(isCacheExist);
      res.status(200).json({
        success: true,
        product,
      });
    } else {
      const product = await productModel.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // await redis.set(productId, JSON.stringify(product), "EX", 7200); // 2 hour

      res.status(200).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update product (only for admin)
export const updateProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;

    // Validate the ID
    if (!isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    // Check if the product exists in the database
    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const data = req.body;
    const images = data.images;

    // Update the images if provided in the request
    if (images && images.length > 0) {
      const updatedImages = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });

        updatedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      // Identify the image public_ids that need to be deleted
      const existingImageIds = product.images.map((image) => image.public_id);
      const imagesToDelete = existingImageIds.filter(
        (public_id) => !updatedImages.some((img) => img.public_id === public_id)
      );

      // Delete the images from Cloudinary
      for (const public_id of imagesToDelete) {
        await cloudinary.uploader.destroy(public_id);
      }

      data.images = updatedImages;
    }

    // Update the product in the database
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $set: data },
      { new: true } // Return the updated document
    );

    // Clear the cache for all keys starting with 'ecommerce:'
    await clearCacheKeys("ecommerce:*");

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Delete product (only for admin)
export const deleteProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the product ID
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne({ id });

    // Clear the cache for all keys starting with 'ecommerce:'
    await clearCacheKeys("ecommerce:*");

    //   await redis.del(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// add review in course
export const addReview = CatchAsyncError(async (req, res, next) => {
  try {
    const userOrders = req.user?.orders;
    const productId = req.params.id;
    const { review, rating } = req.body;

    // check if productId already exists in userOrders based on _id
    // const productExists = userOrders?.some(
    //   (product) => product._id.toString() === productId.toString()
    // );

    // if (!productExists) {
    //   return next(
    //     new ErrorHandler("You are not eligible to review this product", 404)
    //   );
    // }

    const product = await productModel.findById(productId);

    const reviewData = {
      user: req.user,
      rating,
      comment: review,
    };

    product?.reviews.push(reviewData);

    let avg = 0;

    product?.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    if (product) {
      product.ratings = avg / product.reviews.length;
    }

    await product?.save();

    // await redis.set(productId, JSON.stringify(product), "EX", 7200); // 2 hour

    // create notification
    await notificationModel.create({
      user: req.user?._id,
      title: "New Review Received",
      message: `${req.user?.name} has given a review in ${product?.name}`,
      type: "review",
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// add reply to review
export const addReplyToReview = CatchAsyncError(async (req, res, next) => {
  try {
    const { comment, productId, reviewId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const review = product?.reviews?.find(
      (rev) => rev._id.toString() === reviewId
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    const replyData = {
      user: req.user,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!review.commentReplies) {
      review.commentReplies = [];
    }

    review.commentReplies?.push(replyData);

    await product?.save();

    await redis.set(productId, JSON.stringify(product), "EX", 604800); // 7days

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Brands
export const getAllBrands = CatchAsyncError(async (req, res, next) => {
  try {
    const brands = await productModel.aggregate([
      {
        $group: {
          _id: "$brand", // Group by the brand field
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const brandList = brands.map((b) => ({
      brand: b._id,
      count: b.count,
    }));

    res.status(200).json({
      success: true,
      brandList,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get All Categories
export const getAllCategories = CatchAsyncError(async (req, res, next) => {
  const categories = await productModel.aggregate([
    {
      $group: {
        _id: "$category",
      },
    },
  ]);

  const categoriesList = categories.map((c) => ({category: c._id}));

  res.status(200).json({
    success: true,
    categoriesList,
  });

  try {
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
