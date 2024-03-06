import React, { useMemo } from "react";
import Link from "next/link";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
import ProductCard from "../common/ProductCard";

const TopSellingProduct = ({ products }) => {

  const slideSettings = useMemo(() => {
    return {
      slidesPerView: "auto",
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: ".top-sell-next-btn",
        prevEl: ".top-sell-prev-btn",
      },
      breakpoints: {
        280: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        386: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 4,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    };
  }, []);

  return (
    <div className="top-selling-section mb-110">
      <div className="container">
        <div className="section-title3">
          <h3>
            Top Selling <span>Product</span>
          </h3>
          <div className="slider-btn2">
            <div className="top-sell-prev-btn">
              <i className="bx bxs-chevron-left" />
            </div>
            <div className="top-sell-next-btn">
              <i className="bx bxs-chevron-right" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <Swiper {...slideSettings} className="swiper top-selling-slider">
              <div className="swiper-wrapper">
                {products.map((product, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <ProductCard product={product}/>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProduct;
