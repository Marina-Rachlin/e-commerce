"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import Image from "next/image";
import { useGetBrandsQuery } from "../../../redux/features/products/productApi";
import { useGetCategoriesQuery } from "../../../redux/features/products/productApi";

const Sidebar = ({
  value,
  handleChange,
  valuetext,
  isOpenSidebar,
  sidebarRef,
  setPage, //for resetting to 1 if brand or category selected
  brand,
  setBrand,
  category,
  setCategory,
  setPrice,
  topRated,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { isLoading, data, error } = useGetBrandsQuery();
  const {
    isLoading: isLoadingCategories,
    data: categoriesData,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const handleBrandSelect = (selectedBrand) => {
    const newBrand = brand === selectedBrand ? "" : selectedBrand;//if we select that is already selected (unselect)
    setBrand(newBrand);
    setPage(1);
  };

  const handleCategorySelect = (selectedCategory) => {
    const newCategory = category === selectedCategory ? "" : selectedCategory;
    setCategory(newCategory);
    setPage(1);
  };

  const handlePriceSelect = () => {
    console.log("Selected Price Range:", value);
    setPrice(value);
    setPage(1);
  };

  useEffect(() => {
    if (isLoading || isLoadingCategories) return;

    if (error || categoriesError) {
      console.log(error || categoriesError);
      return;
    }

    if (data?.brandList) {
      //ensure that not undefined
      setBrands(data.brandList);
    }
    if (categoriesData?.categoriesList) {
      setCategories(categoriesData.categoriesList);
    }
  }, [
    isLoading,
    isLoadingCategories,
    data,
    categoriesData,
    error,
    categoriesError,
  ]);

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
                <button onClick={handlePriceSelect}>Apply</button>
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
                    className={`brand-list ${
                      isCategorySelected ? "selected" : ""
                    }`}
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
          {topRated?.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className={`top-product-widget ${
                index !== topRated.length - 1 ? "mb-20" : ""
              }`}
            >
              <div className="top-product-img">
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  width="92"
                  height="71"
                  style={{ objectFit: "cover" }}

                />
              </div>
              <div className="top-product-content">
                <h6>
                  <Link legacyBehavior href={`/shop/products/${item._id}`}>
                    <a>{item.name}</a>
                  </Link>
                </h6>
                <span>
                  {item?.discountPrice !== null ? (
                    <>
                      ${item?.discountPrice} <del>${item?.price}</del>
                    </>
                  ) : (
                    `$${item?.price}`
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
