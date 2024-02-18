import React from "react";
import WishlistItem from "./WishlistItem";
import { useSelector } from "react-redux";
import Script from 'next/script';
import Head from 'next/head'

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  return (
    <>
       <Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-81GLR4VQK9"></Script>
    <Script>
      {
        ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-81GLR4VQK9');`
      }
    </Script>
    </Head>
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
                            />
                          ))
                      ) : (
                        <p>Your wishlist is empty.</p>
                      ) 
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
