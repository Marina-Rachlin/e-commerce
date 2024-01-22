import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import QuickViewButton from "./QuickViewButton";

const ProductCard = ({ product }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6">
      <div className="product-card2">
        <div className="batch">
          {product.isHot && <span>Hot</span>}
          {product.isNew && <span>NEW</span>}
          {product.discount !== 0 && <span>-{product.discount}%</span>}
        </div>
        <div className="product-card-img">
          <Link legacyBehavior href={`/shop/products/${product._id}`}>
            <a>
              <img src={product.image} alt={product.name} />
            </a>
          </Link>
          <div className="cart-btn-area">
            <div className="cart-btn">
            <Link legacyBehavior href="/shop/cart">
              <a  className="add-cart-btn2 round hover-btn5"><i className="bi bi-bag-check" /> Add To Cart</a>
              </Link>
            </div>
          </div>
          <div className="view-and-favorite-area">
            <ul>
              <li>
                <AddToWishlistButton product = ''/>
              </li>
              <li>
                <QuickViewButton />
              </li>
            </ul>
          </div>
        </div>
        <div className="product-card-content">
           <p>
           {product.category}
          </p>
          <h6>
            <Link legacyBehavior href={`/shop/products/product`}>
              <a className="hover-underline">{product.name}</a>
            </Link>
          </h6>
          <span>
            ${product.price} {" "} <del>${product.originalPrice}</del>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard
