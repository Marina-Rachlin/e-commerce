import Link from 'next/link';
import React from 'react';
import ViewAllLink from '../common/VIewAllLink';
import CategoryCard from '../common/CategoryCard';


const PopularCategory = () => {
  return (
    <div className="popular-category-section mb-110">
      <div className="container">
        <div className="section-title3">
          <h3>Popular <span>Category</span> </h3>
          <ViewAllLink lastWord='Category'  path='/shop/categories'/>
        </div>
        <div className="row g-4">
          <CategoryCard
            imageSrc="/assets/img/categories/body.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Bath & Body')}`}
            categoryName="Bath & Body"
             />
          <CategoryCard
            imageSrc="/assets/img/categories/skin.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Skin Care')}`}
            categoryName="Skin Care"
             />
         <CategoryCard
            imageSrc="/assets/img/categories/hair.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Hair Care')}`}
            categoryName="Hair Care"
             />
          <CategoryCard
            imageSrc="/assets/img/categories/kids.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Kids & Baby')}`}
            categoryName="kids & Baby"
             />
        <CategoryCard
            imageSrc="/assets/img/categories/makeup.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Makeup')}`}
            categoryName="Makeup"
             />
         <CategoryCard
            imageSrc="/assets/img/categories/tools.png"
            linkHref={`/shop/products?category=${encodeURIComponent('Accessories')}`}
            categoryName="Accessories"
             />
        </div>
      </div>
    </div>
  )
}

export default PopularCategory
