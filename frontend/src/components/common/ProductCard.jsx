import Link from "next/link";
import React, {useState} from "react";
import QuickViewButton from "./QuickViewButton";
import {
  addItem,
  removeItem,
} from "../../redux/features/wishlist/wishlistSlice";
import { addItemToCart } from "../../redux/features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateCartMutation } from "../../redux/features/cart/cartApi";
import QuantityCounter from "../../utils/QuantityCounter";
import debounce from "lodash/debounce";
import { useAddToWishlistMutation, useDeleteFromWishlistMutation } from '../../redux/features/wishlist/wishlistApi';


const ProductCard = ({ product }) => {

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const [updateCart] = useUpdateCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteFromWishlist] = useDeleteFromWishlistMutation();

  const debouncedAddToWishlist = debounce(async (productId) => {
    await addToWishlist(productId).unwrap();
  }, 300);

  const debouncedDeleteFromWishlist = debounce(async (productId) => {
    await deleteFromWishlist(productId).unwrap();
  }, 300);

  const handleToggleWishlist = (product) => {
    const inWishlist = isProductInWishlist(product._id);
    if (inWishlist) {
      dispatch(removeItem(product._id)); //update client
      debouncedDeleteFromWishlist(product._id);//update server
    } else {
      dispatch(addItem(product)); //update client
      debouncedAddToWishlist(product._id);//update server
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
};


  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Define the debounced function for updating the cart
  const debouncedUpdateCart = debounce(async (productId) => {
    await updateCart({ productId: productId, quantity: 1 });
  }, 300);

  // Handle adding to cart
  const handleAddToCart = (productId) => {
    dispatch(addItemToCart({ productId, quantity: 1 })); // Update client
    debouncedUpdateCart(productId); // Update server
  };


  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 col-6">
      <div className="product-card2">
        <div className="batch">
          {product.isHot && <span>Hot</span>}
          {product.isNew && <span>NEW</span>}
          {product.discount !== 0 && <span>-{product.discount}%</span>}
        </div>
        <div className="product-card-img">
          <Link legacyBehavior href={`/shop/products/${product._id}`}>
            <a>
              <img src={product.images[0].url} alt={product.name} loading="lazy"/>
            </a>
          </Link>
          <div className="cart-btn-area">
            <div className="cart-btn">
              <button
              className="add-cart-btn2 round hover-btn5"
              onClick={() => handleAddToCart(product)}
            >
              <i className="bi bi-bag-check" /> Add To Cart
            </button>
            </div>
          </div>
          <div className="view-and-favorite-area">
            <ul>
              <li>
              <button onClick={() => handleToggleWishlist(product)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={13}
                  height={13}
                  viewBox="0 0 18 18"
                  className={isProductInWishlist(product._id) ? "heart-filled" : ""}
                >
                  <g clipPath="url(#clip0_168_378)">
                    <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                  </g>
                </svg>
              </button>
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
            <Link legacyBehavior href={`/shop/products/${product._id}`}>
              <a className="hover-underline">{product.name}</a>
            </Link>
          </h6>
          <span>
            {product?.discountPrice !== null ? (
            <>
              ${product?.discountPrice} <del>${product?.price}</del>
            </>
          ) : (
            `$${product?.price}`
          )}
          </span>
          <div className="rating">
  {product?.ratings > 0 ? (
    <ul>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <li key={index}>
            <i className={`bi ${ratingValue <= product.ratings ? "bi-star-fill" : "bi-star"}`} />
          </li>
        );
      })}
    </ul>
  ) : null}
  {product?.commentsCount > 0 && <span>({product.commentsCount})</span>}
</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard
