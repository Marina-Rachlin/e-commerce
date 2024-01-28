import React from "react";
import WishlistItem from "./WishlistItem";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../../redux/features/wishlist/wishlistSlice";
import { debounce } from "lodash";
import { wishlistApi } from "../../../redux/features/wishlist/wishlistApi";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <>
      <div className="whistlist-section mt-110 mb-110">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="whistlist-table">
                <table className="eg-table2">
                  <thead>
                    <tr>
                      <th />
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      wishlist && wishlist.length > 0 ? (
                        wishlist
                          .slice() // Create a copy of the wishlist array
                          .reverse() // Reverse the copied array
                          .map((item) => (
                            <WishlistItem
                              key={item._id}
                              product={item}
                              // handleDelete={handleRemoveFromWishlist}
                            />
                          ))
                      ) : (
                        <p>Your wishlist is empty.</p>
                      ) // Message to display if the wishlist is empty
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
