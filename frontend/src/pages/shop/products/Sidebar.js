"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import { useGetBrandsQuery } from "../../../redux/features/products/productApi";
import { useGetCategoriesQuery } from "../../../redux/features/products/productApi";

const Sidebar = ({
  value,
  handleChange,
  valuetext,
  isOpenSidebar,
  sidebarRef,
  setPage, //for resetting to 1 if brand or category selected
  brand, setBrand,
  category, setCategory
}) => {

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const topRated = [
    {
      name: "Magical Eyelash Extensions",
      url: "jnjnjj",
      price: "15.00",
      discountPrice: "20.00",
    },
    {
      name: "Magical Eyelash Extensions",
      url: "jnjnjj",
      price: "15.00",
      discountPrice: "20.00",
    },
    {
      name: "Magical Eyelash Extensions",
      url: "jnjnjj",
      price: "15.00",
      discountPrice: "20.00",
    },
  ];
  const { isLoading, data, error } = useGetBrandsQuery();
  const { isLoading: isLoadingCategories, data: categoriesData, error: categoriesError } = useGetCategoriesQuery();

  const handleBrandSelect = (brand) => {
    setBrand(brand);
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setPage(1);
  };

  useEffect(() => {
    if (isLoading || isLoadingCategories) return;

    if (error || categoriesError) {
      console.log(error || categoriesError);
      return; 
    }

    if (data?.brandList) { //ensure that not undefined
      setBrands(data.brandList);
    }
    if (categoriesData?.categoriesList) {
      setCategories(categoriesData.categoriesList);
    }
  }, [isLoading, isLoadingCategories, data, categoriesData, error, categoriesError]);

  return (
    <div
      className={`filter-sidebar ${isOpenSidebar ? "slide" : ""}`}
      ref={sidebarRef}
    >
      <div className="sidebar-area">
        {/* <!-- Price slider --> */}
        <div className="shop-widget mb-30">
          <h5 className="shop-widget-title">Price Filter</h5>

          <Box
            sx={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%", xl: "20%" }}
          >
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              sx={{
                color: "#222222", // Change the color here
              }}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
            <div className="range-wrap">
              <div className="slider-labels">
                <div className="caption">
                  <span id="slider-range-value1">${value[0]}</span>
                </div>
                <a href="#">Apply</a>
                <div className="caption">
                  <span id="slider-range-value2">${value[1]}</span>
                </div>
              </div>
            </div>
          </Box>
        </div>

        {/* <!-- Category filter --> */}
        <div className="shop-widget mb-30">
          <div className="check-box-item">
            <h5 className="shop-widget-title">Categories</h5>
            <ul className="shop-item">
              {categories?.map((item, index) => {
                const isCategorySelected = item.category === category;
                return (
                  <li
                    className={`brand-list ${isCategorySelected ? "selected" : ""}`}
                    key={index}
                    onClick={() => handleCategorySelect(item.category)}
                  >
                    <div className="custom">
                      <p>{item.category}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* <!-- Brand Filter --> */}
        <div className="shop-widget mb-30">
          <div className="check-box-item">
            <h5 className="shop-widget-title">Our Brand </h5>
            <ul className="shop-item">
              {brands?.map((item, index) => {
                // Check if the current item is selected
                const isSelected = item.brand === brand;
                return (
                  <li
                    className={`brand-list ${isSelected ? "selected" : ""}`}
                    key={index}
                    onClick={() => handleBrandSelect(item.brand)}
                  >
                    <div className="custom">
                      <p>{item.brand}</p>
                      <span>{item.count}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* <!-- Top Rated --> */}
        <div className="shop-widget">
          <h5 className="shop-widget-title">Top Rated Product</h5>
          {topRated?.map((item, index) => {
            return (
              <div
                key={index}
                className={`top-product-widget ${
                  index !== topRated.length - 1 ? "mb-20" : ""
                }`}
              >
                <div className="top-product-img">
                  <Link legacyBehavior href="/product-default">
                    <a>
                      <img
                        src={"/assets/img/inner-page/top-product1.png"}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="top-product-content">
                  <h6>
                    <Link legacyBehavior href="/product-default">
                      <a>{item.name}</a>
                    </Link>
                  </h6>
                  <span>
                    ${item.discountPrice} <del>${item.price}</del>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
