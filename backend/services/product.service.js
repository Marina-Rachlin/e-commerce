import productModel from "../models/product.model.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import { redis } from "../utils/redis.js";

export const calculateTotalPages = (totalItems, pageSize) => {
  return Math.ceil(totalItems / pageSize);
};

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
export const getAllProductsService = async (
  page,
  pageSize,
  category,
  brand,
  stock,
  value,
  context,
  req
) => {
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
      if (stock === ">0") {
        filter.stock = { $gt: 0 };
      } else {
        filter.stock = stock;
      }
    }
    if (value) {
      filter.name = { $regex: new RegExp(value, "i") }; // Case-insensitive search
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
    if (context === "admin") {
      // If the context is 'admin', exclude the 'description' field
      projection.description = 0; // If the context is 'admin', include only the first image
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

    totalProducts =
      category === "" && brand === "" && stock === "" && value === ""
        ? totalProducts
        : products.length;

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

export const getAllProductsShopService = async (
  page,
  pageSize,
  sort,
  brand,
  category,
  minPrice,
  maxPrice,
  req
) => {

  try {

    let sortOptions = {};
switch (sort) {
  case "price_asc":
    sortOptions = { discountPrice: 1, price: 1 };
    break;
  case "price_desc":
    sortOptions = { discountPrice: -1, price: -1 };
    break;
  default:
    sortOptions = { createdAt: -1 }; // Default sorting by createdAt if no sort option is provided
}

    let matchStage = {};
    if (brand) {
      matchStage.brand = brand; // Filter by brand if specified
    }

    // Add this block for filtering by category
    if (category) {
      matchStage.category = category; // Filter by category if specified
    }

    // Add this block for filtering by price range
    if (minPrice !== undefined && maxPrice !== undefined) {
      matchStage.$or = [
        {
          $and: [
            { discountPrice: { $ne: null } },
            { discountPrice: { $gte: minPrice, $lte: maxPrice } },
          ],
        },
        {
          $and: [
            { discountPrice: null },
            { price: { $gte: minPrice, $lte: maxPrice } },
          ],
        },
      ];
    }

    // Main product aggregation for pagination and sorting
    const productsAggregation = await productModel.aggregate([
      { $match: matchStage },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          paginatedResults: [
            { $sort: sortOptions },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize },
            {
              $project: {
                name: 1,
                brand: 1,
                category: 1,
                price: 1,
                discountPrice: 1,
                stock: 1,
                images: { $slice: ["$images", 1] },
                commentsCount: { $size: "$reviews" },
                ratings: 1,
                purchased: 1,
                isNewProduct: 1,
                isHotProduct: 1,
                discount: 1,
              },
            },
          ],
        },
      },
    ]);

    // Extracting the main query results
    const totalProducts = productsAggregation[0].totalCount[0]?.count || 0;
    const products = productsAggregation[0].paginatedResults;
    const totalPages = calculateTotalPages(totalProducts, pageSize);

    // Independent query for top-rated products
    const topRatedAggregation = await productModel.aggregate([
      { $match: { ratings: { $gte: 4 } } }, // Only consider products with ratings 4 or above
      { $sort: { ratings: -1, commentsCount: -1 } }, // Sort them by ratings and comments count
      { $limit: 4 }, // Limit to top 4
      {
        $project: {
          name: 1,
          brand: 1,
          price: 1,
          discountPrice: 1,
          images: { $slice: ["$images", 1] },
          ratings: 1,
        },
      },
    ]);

       // Independent query for mostPopular products
       const mostPopularAggregation = await productModel.aggregate([
        { $sort: {purchased: -1 } },
        { $limit: 8 }, 
        {
          $project: {
            name: 1,
            brand: 1,
            price: 1,
            discountPrice: 1,
            images: { $slice: ["$images", 1] },
            ratings: 1,
            commentsCount: { $size: "$reviews" },
            isNewProduct: 1,
            isHotProduct: 1,
            discount: 1
          },
        },
      ]);

    return {
      source: "database",
      products,
      topRated: topRatedAggregation,
      mostPopular: mostPopularAggregation, // Now statically set, unaffected by the main query's filters
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
// export const getOutOfStockProductsService = async () => {
//   //TODO: check how better to do
//   try {
//     const cachedData = await redis.get("outOfStock");

//     if (cachedData) {
//       const outOfStockProducts = JSON.parse(cachedData);
//       return {
//         source: "cache",
//         products: outOfStockProducts,
//         totalProducts: outOfStockProducts.length,
//       };
//     }

//     const outOfStockProducts = await productModel.find({ stock: 0 });

//     if (!outOfStockProducts || outOfStockProducts.length === 0) {
//       return {
//         source: "database",
//         products: [],
//         totalProducts: 0,
//       };
//     }

//     await redis.set(
//       "outOfStock",
//       JSON.stringify(outOfStockProducts),
//       "EX",
//       10800
//     ); // 3 hours

//     return {
//       source: "database",
//       products: outOfStockProducts,
//       totalProducts: outOfStockProducts.length,
//     };
//   } catch (error) {
//     throw new Error("Error accessing the database");
//   }
// };






