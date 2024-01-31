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
export const getAllProductsService = async (page, pageSize, category, brand, stock, value, context, req) => {
  try {
    let totalProducts = await productModel.countDocuments();
    const totalPages = calculateTotalPages(totalProducts, pageSize);
    const cacheKey = generateCacheKey(req);

    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (stock) {
      if (stock === '>0') {
        filter.stock = { $gt: 0 };
      } else {
        filter.stock = stock;
      }
    }
    if (value) {
      filter.name = { $regex: new RegExp(value, 'i') }; // Case-insensitive search
    }

    // const cachedData = await redis.get(cacheKey);

    // if (cachedData) {
    //   const products = JSON.parse(cachedData);
    //   return {
    //     source: "cache",
    //     products: products,
    //     totalProducts,
    //     page,
    //     pageSize,
    //     totalPages,
    //   };
    // }

    const projection = {};

    // Check the context to decide what to exclude from res
    if (context === 'admin') {              // If the context is 'admin', exclude the 'description' field
      projection.description = 0;          // If the context is 'admin', include only the first image
      projection.images = { $slice: 1 };
    }

    const products = await productModel
      .find(filter, projection)  
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

        if (!products) {
      throw new Error("No products found in the database");
    }

    totalProducts = (category === '' && brand === '' && stock === '' && value === '') ? totalProducts : products.length;

// if ((!category || category === 'all') && (!brand || brand === 'all') && !stock && !value) {
//   await redis.set(cacheKey, JSON.stringify(products), "EX", 10800); // 3 hours
// }

    return {
      source: "database",
      products,
      totalProducts,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    throw error;
  }
};

// Get All Products Shop
export const getAllProductsShopService = async (page, pageSize, req) => {
  try {
    let totalProducts = await productModel.countDocuments();
    const totalPages = calculateTotalPages(totalProducts, pageSize);
    const cacheKey = `${req.originalUrl}:${page}`;

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
    const projection = { images: { $slice: 1 } }; // Apply $slice to the images field

    const products = await productModel
      .find({}, projection) // Apply the projection to the images field
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

        if (!products) {
      throw new Error("No products found in the database");
    }

await redis.set(cacheKey, JSON.stringify(products), "EX", 86400); // 24 hours

    return {
      source: "database",
      products,
      totalProducts,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    throw error;
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
