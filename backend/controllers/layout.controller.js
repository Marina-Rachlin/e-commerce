import ErrorHandler from "../utils/ErrorHandler.js";
import LayoutModel from "../models/layout.model.js";
import {v2 as cloudinary} from "cloudinary";

// create layout
const createLayout = async (req, res, next) => {
  try {
    const { type } = req.body;
    const isTypeExist = await LayoutModel.findOne({ type });
    if (isTypeExist) {
      return next(new ErrorHandler(`${type} already exists`, 400));
    }


    // if (type === "Banner") {
    //   const { image, title, subTitle } = req.body;
    //   const myCloud = await cloudinary.v2.uploader.upload(image, {
    //     folder: "layout",
    //   });
    //   const banner = {
    //     type: "Banner",
    //     banner: {
    //       image: {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //       },
    //       title,
    //       subTitle,
    //     },
    //   };
    //   await LayoutModel.create(banner);
    // }

    if (type === "Banner") {
      const { banners } = req.body;

      // Handle multiple banners
      const bannerData = await Promise.all(banners.map(async (banner) => {
        const myCloud = await cloudinary.v2.uploader.upload(banner.image, {
          folder: "layout",
        });
        return {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title: banner.title,
          subtitle: banner.subtitle,
          discount: banner.discount,
          blackFriday: banner.blackFriday,
        };
      }));

      const newLayout = { type, banners: bannerData };
      if (layoutData) {
        // Update existing layout
        await LayoutModel.findByIdAndUpdate(layoutData._id, newLayout);
      } else {
        // Create new layout
        await LayoutModel.create(newLayout);
      }
    }



    if (type === "FAQ") {
      const { faq } = req.body;
      const faqItems = await Promise.all(
        faq.map((item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await LayoutModel.create({ type: "FAQ", faq: faqItems });
    }
    if (type === "Categories") {
      const { categories } = req.body;
      const categoriesItems = await Promise.all(
        categories.map((item) => {
          return {
            title: item.title,
          };
        })
      );
      await LayoutModel.create({
        type: "Categories",
        categories: categoriesItems,
      });
    }

    res.status(200).json({
      success: true,
      message: "Layout created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Edit layout
const editLayout = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === "Banner") {
      const bannerData = await LayoutModel.findOne({ type: "Banner" });

      const { image, title, subTitle } = req.body;

      const data = image.startsWith("https")
        ? bannerData
        : await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });

      const banner = {
        type: "Banner",
        image: {
          public_id: image.startsWith("https")
            ? bannerData.banner.image.public_id
            : data?.public_id,
          url: image.startsWith("https")
            ? bannerData.banner.image.url
            : data?.secure_url,
        },
        title,
        subTitle,
      };

      await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
    }

    if (type === "FAQ") {
      const { faq } = req.body;
      const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
      const faqItems = await Promise.all(
        faq.map((item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await LayoutModel.findByIdAndUpdate(FaqItem._id, {
        type: "FAQ",
        faq: faqItems,
      });
    }
    if (type === "Categories") {
      const { categories } = req.body;
      const categoriesData = await LayoutModel.findOne({
        type: "Categories",
      });
      const categoriesItems = await Promise.all(
        categories.map((item) => {
          return {
            title: item.title,
          };
        })
      );
      await LayoutModel.findByIdAndUpdate(categoriesData._id, {
        type: "Categories",
        categories: categoriesItems,
      });
    }

    res.status(200).json({
      success: true,
      message: "Layout Updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get layout by type
const getLayoutByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const layout = await LayoutModel.findOne({ type });
    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export { createLayout, editLayout, getLayoutByType };
