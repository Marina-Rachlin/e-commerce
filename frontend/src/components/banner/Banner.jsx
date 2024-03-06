import React, { useMemo } from "react";
import Link from "next/link";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { banner1Data } from "../../data/bannerData";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

const Banner = () => {

  const { data,isLoading } = useGetHeroDataQuery("Banner", {});



  const bannerSlideSetting = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      loop: true,
      autoplay: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination1",
        clickable: true,
      },
    };
  },[])
  return (
    <>
      <div className="banner-section">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-lg-12">
              <Swiper {...bannerSlideSetting} className="swiper banner1-slider">
                <div className="swiper-wrapper">
                  {banner1Data.map((e) => {
                    const {
                      id,
                      banner_img,
                      title,
                      description,
                      discount,
                      blackFriday,
                    } = e;
                    return (
                      <SwiperSlide className="swiper-slide" key={id}>
                        <div className="banner-wrapper">
                          <div className="banner-left">
                            <img
                              src={banner_img}
                              alt=""
                              className="banner-vector1"
                            />
                            <img
                              src="/assets/img/home1/icon/banner-vector2.svg"
                              alt=""
                              className="banner-vector2"
                            />
                            <img
                              src="/assets/img/home1/icon/banner-vector3.svg"
                              alt=""
                              className="banner-vector3"
                            />
                            <div className="banner-content">
                              <div className="discount">
                                <img
                                  src="/assets/img/home1/discount-bg.svg"
                                  alt=""
                                />
                                <p>
                                  <strong>{discount}%</strong>OFF
                                </p>
                              </div>
                              <h1>{title}</h1>
                              <p>{description}</p>
                              <Link legacyBehavior href="/shop/products">
                                <a className="primary-btn1 hover-btn3">
                                  *Shop Now*
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div className="banner-right-wrapper">
                            <div className="banner-right-img">
                              {blackFriday ? (
                                <img
                                  src="/assets/img/home1/banner-right-tag.png"
                                  alt=""
                                  className="discount-tag"
                                />
                              ) : (
                                <></>
                              )}
                              <img
                                src={banner_img}
                                alt=""
                                className="banner-right-bg"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </div>
                <div className="swiper-pagination1" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
