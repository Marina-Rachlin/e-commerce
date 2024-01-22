import Link from "next/link";
import React from "react";
import GiftSection from "../../../components/common/GiftSection";

const OurBrandPage = () => {
  const brand = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <div className="brands-section mt-110 mb-110">
        <div className="container">
          <div className="brands-section-title mb-70">
            <p>EXPLORE</p>
            <h1>Brands</h1>
          </div>
          <div className="row border-remove row-cols-xl-5 row-cols-lg-4 row-cols-sm-3 row-cols-1 g-0">
            {brand.map((e) => {
              return <div className="col" key={e}>
              <div className="client-logo">
                <Link legacyBehavior href="/shop">
                  <a>
                    <img
                      src={`assets/img/inner-page/brnads-logo${e}.png`}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            })}
          </div>
        </div>
      </div>
      <GiftSection />
    </>
  );
};

export default OurBrandPage;
