import React from "react";
import ProductCard from "../common/ProductCard";
import ViewAllLink from "../common/VIewAllLink";

const FeatureProduct = ({ products }) => {
  
  return (
    <div className="feature-product-section mb-110">
      <div className="container">
        <div className="section-title3">
          <h3>
            Featured <span>Products</span>{" "}
          </h3>
          <ViewAllLink lastWord={'Products'} path='shop/products' />
        </div>
        <div className="row g-4 justify-content-center">
          {products?.map((product, index) => (
            <div className="col-xl-3 col-lg-4 col-sm-6 col-6">
            <ProductCard key={index} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeatureProduct;
