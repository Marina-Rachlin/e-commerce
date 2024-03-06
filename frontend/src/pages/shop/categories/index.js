// import React from "react";
// import GiftSection from "../../../components/common/GiftSection";
// import { categoryCardData } from "../../../data/categoryCard";
// import Link from "next/link";

// function Category() {
//   return (
//     <>
//       <div className="category-section mt-110 mb-110">
//         <div className="container">
//           <div className="category-section-title mb-70">
//             <p>EXPLORE</p>
//             <h1>Category</h1>
//           </div>
//           <div className="row gy-5 mb-60">
//             {categoryCardData.map((category) => (
//               <div key={category.id} className="col-lg-3 col-sm-6 col-6">
//                 <div className="category-card">
//                   <div className="category-card-img hover-img">
//                     {/* <Link legacyBehavior href={`/shop?category=${encodeURIComponent(category.category_title)}`}>
//                       <a>
//                         <img src={category.img} alt="" loading="lazy"/>
//                       </a>
//                     </Link> */}
//                        <Link
//                       legacyBehavior
//                       href={`/shop?category=${encodeURIComponent(
//                         category.category_title
//                       )}`}
//                     >
//                       <a>
//                         <img src={category.img} alt="" loading="lazy" />
//                       </a>
//                     </Link>
//                   </div>
//                   <div className="category-card-content">
//                     {/* <Link legacyBehavior href={`/shop?category=${encodeURIComponent(category.category_title)}`}>
//                       <a>{category.category_title}</a>
//                     </Link> */}
//                         <Link
//                       legacyBehavior
//                       href={`/shop?category=${encodeURIComponent(
//                         category.category_title
//                       )}`}
//                     >
//                       <a onClick={() => router.push(`/shop?category=${encodeURIComponent(category.category_title)}`)}>
//                         {category.category_title}
//                       </a>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="load-more-btn">
//             <a href="#" className="primary-btn1 hover-btn3">
//               *Load More*
//             </a>
//           </div>
//         </div>
//       </div>
//       <GiftSection />
//     </>
//   );
// }

// export default Category;

import React from "react";
import { useRouter } from "next/router";
import GiftSection from "../../../components/common/GiftSection";
import { categoryCardData } from "../../../data/categoryCard";
import Link from "next/link";

function Category() {
  const router = useRouter();

  return (
    <>
      <div className="category-section mt-110 mb-110">
        <div className="container">
          <div className="category-section-title mb-70">
            <p>EXPLORE</p>
            <h1>Category</h1>
          </div>
          <div className="row gy-5 mb-60">
            {categoryCardData.map((category) => (
              <div key={category.id} className="col-lg-3 col-sm-6 col-6">
                <div className="category-card">
                  <div className="category-card-img hover-img">
                    <Link
                      legacyBehavior
                      href={`/shop/products?category=${encodeURIComponent(
                        category.category_title
                      )}`}
                    >
                      <a>
                        <img src={category.img} alt="" loading="lazy" />
                      </a>
                    </Link>
                  </div>
                  <div className="category-card-content">
                    <Link
                      legacyBehavior
                      href={`/shop/products?category=${encodeURIComponent(
                        category.category_title
                      )}`}
                    >
                      <a onClick={() => router.push(`/shop/products?category=${encodeURIComponent(category.category_title)}`)}>
                        {category.category_title}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more-btn">
            <a href="#" className="primary-btn1 hover-btn3">
              *Load More*
            </a>
          </div>
        </div>
      </div>
      <GiftSection />
    </>
  );
}

export default Category;

