import productModel from "../models/product.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import { redis } from "../utils/redis.js";

export const calculateTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
}

export const generateCacheKey = (req) => {
  return `${req.originalUrl}:${req.query.page}:${req.query.pageSize}`;
};

// Create product
export const createProduct = CatchAsyncError(async (data, res) => {
  const product = await productModel.create(data);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
export const getAllProductsService = async (page, pageSize, req) => {
  try {
    const totalProducts = await productModel.countDocuments();

    const totalPages = calculateTotalPages(totalProducts, pageSize);

    const cacheKey = generateCacheKey(req);

    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const products = JSON.parse(cachedData);
      return {
        source: "cache",
        products: products,
        totalProducts,
        page,
        pageSize,
        totalPages,
      };
    }

    const products = await productModel.find().sort({ createdAt: -1 }).limit(pageSize).skip((page - 1) * pageSize);

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found in the database",
      });
    }

    await redis.set(cacheKey, JSON.stringify(products), "EX", 10800); //3 hours

    return {
      source: "database",
      products,
      totalProducts,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error accessing the database",
    }); 
  }
};

//getOutOfStockProductsService
export const getOutOfStockProductsService = async () => { //TODO: check how better to do
  try {
    const cachedData = await redis.get("outOfStock");

    if (cachedData) {
      const outOfStockProducts = JSON.parse(cachedData);
      return {
        source: "cache",
        products: outOfStockProducts,
        totalProducts: outOfStockProducts.length, 
      };
    }

    const outOfStockProducts = await productModel.find({ stock: 0 });

    if (!outOfStockProducts || outOfStockProducts.length === 0) {
      return {
        source: "database",
        products: [],
        totalProducts: 0,
      };
    }

    await redis.set("outOfStock", JSON.stringify(outOfStockProducts), "EX", 10800); // 3 hours

    return {
      source: "database",
      products: outOfStockProducts,
      totalProducts: outOfStockProducts.length,
    };
  } catch (error) {
    throw new Error("Error accessing the database");
  }
};
