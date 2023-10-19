import React from "react";
import ProductCard from "../common/ProductCard";
import Link from "next/link";


const FeatureProduct2 = ({ props }) => {

const products = [
  {
    name: 'Crystal-Infused Highlighter',
    slug: 'crystal-infused-highlighter',
    image: '/assets/img/products/product-img-1.png',
    category: 'Makeup',
    price: 150.00,
    originalPrice: 200.00,
    sizes: ['250 ml', '500 ml', '1000 ml', '1500 ml'],
    isHot: true,
    discount: 15,
    isNew: false,
  },
  {
    name: 'Makeup Smooth Brushes',
    slug: 'makeup-smooth-brushes',
    image: '/assets/img/products/product-img-2.png',
    category: 'Makeup',
    price: 132.00,
    originalPrice: 200.00,
    sizes: [],
    isHot: false,
    discount: 0,
    isNew: true,
  },
  {
    name: 'Eyeshadow Palette',
    slug: 'eyeshadow-palette',
    image: '/assets/img/products/product-img-3.png',
    category: 'Makeup',
    price: 25.00,
    originalPrice: 30.00,
    sizes: [],
    isHot: false,
    discount: 0,
    isNew: true,
  },
  {
    name: 'Moisturizing Cream',
    slug: 'moisturizing-cream',
    image: '/assets/img/products/product-img-4.png',
    category: 'Skincare',
    price: 45.00,
    originalPrice: 50.00,
    sizes: ['50 ml', '100 ml'],
    isHot: false,
    discount: 10,
    isNew: false,
  },
  {
    name: 'Hair Conditioner',
    slug: 'hair-conditioner',
    image: '/assets/img/products/product-img-5.png',
    category: 'Hair Care',
    price: 12.00,
    originalPrice: 15.00,
    sizes: ['250 ml'],
    isHot: true,
    discount: 20,
    isNew: false,
  },
];

  return (
    <div className="feature-product-section mb-110">
      <div className="container">
        <div className="section-title3">
          <h3>
            Featured <span>Product</span>{" "}
          </h3>
          <div className="view-all">
            <Link legacyBehavior href="/shop/full-width">
              <a>
                View All Product
                <svg
                  width={33}
                  height={13}
                  viewBox="0 0 33 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M25.5083 7.28L0.491206 7.25429C0.36093 7.25429 0.23599 7.18821 0.143871 7.0706C0.0517519 6.95299 0 6.79347 0 6.62714C0 6.46081 0.0517519 6.3013 0.143871 6.18369C0.23599 6.06607 0.36093 6 0.491206 6L25.5088 6.02571C25.6391 6.02571 25.764 6.09179 25.8561 6.2094C25.9482 6.32701 26 6.48653 26 6.65286C26 6.81919 25.9482 6.9787 25.8561 7.09631C25.764 7.21393 25.6386 7.28 25.5083 7.28Z" />
                  <path d="M33.0001 6.50854C29.2204 7.9435 24.5298 10.398 21.623 13L23.9157 6.50034L21.6317 0C24.5358 2.60547 29.2224 5.06539 33.0001 6.50854Z" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeatureProduct2;
