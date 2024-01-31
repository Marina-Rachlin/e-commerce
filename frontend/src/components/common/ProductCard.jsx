import Link from "next/link";
import React, {useState} from "react";
import AddToWishlistButton from "./AddToWishlistButton";
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
              <button
              className="add-cart-btn2 round hover-btn5"
              // onClick={() => handleAddToCart(product)}
            >
              <i className="bi bi-bag-check" /> Add To Cart
            </button>
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
