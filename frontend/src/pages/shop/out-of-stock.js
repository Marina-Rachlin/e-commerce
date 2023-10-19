import React from 'react'
import NewestProduct from "@/src/components/Home/NewestProduct";
import GiftSection from "@/src/components/common/GiftSection";
import useMagneticHover from "@/src/hooks/useMagneticHover";
import Link from 'next/link';
const OutOfStock = () => {
    useMagneticHover(); 
  return (
  <>
      <div className="shop-details-top-section mt-110 mb-110"> 
        <div className="container-xl container-fluid-lg container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="shop-details-img style-4">  
                <div className="nav nav-pills order-xl-1 order-lg-2 order-sm-1 order-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-img1-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img1" type="button" role="tab" aria-controls="v-pills-img1" aria-selected="true">
                    <img src="/assets/img/inner-page/shop-details-nav-img5.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img2" type="button" role="tab" aria-controls="v-pills-img2" aria-selected="false">
                    <img src="/assets/img/inner-page/shop-details-nav-img6.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img3-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img3" type="button" role="tab" aria-controls="v-pills-img3" aria-selected="false">
                    <img src="/assets/img/inner-page/shop-details-nav-img7.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img4-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img4" type="button" role="tab" aria-controls="v-pills-img4" aria-selected="false">
                    <img src="/assets/img/inner-page/shop-details-nav-img8.png" alt="" />
                  </button>
                </div>
                <div className="tab-content order-xl-2 order-lg-1 order-sm-2 order-1" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-img1" role="tabpanel">
                    <div className="shop-details-tab-img product-img--main" data-scale="1.4" data-image="./assets/img/inner-page/shop-details-tab-img1.png">
                      <img src="/assets/img/inner-page/shop-details-tab-img1.png" alt="" />
                    </div> 
                  </div>
                  <div className="tab-pane fade" id="v-pills-img2" role="tabpanel">
                    <div className="shop-details-tab-img product-img--main" data-scale="1.4" data-image="./assets/img/inner-page/shop-details-tab-img2.png">
                      <img src="/assets/img/inner-page/shop-details-tab-img2.png" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-img3" role="tabpanel" aria-labelledby="v-pills-img3-tab">
                    <div className="shop-details-tab-img product-img--main" data-scale="1.4" data-image="./assets/img/inner-page/shop-details-tab-img3.png">
                      <img src="/assets/img/inner-page/shop-details-tab-img3.png" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-img4" role="tabpanel" aria-labelledby="v-pills-img4-tab">
                    <div className="shop-details-tab-img product-img--main" data-scale="1.4" data-image="./assets/img/inner-page/shop-details-tab-img4.png">
                      <img src="/assets/img/inner-page/shop-details-tab-img4.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shop-details-content style-3">
                <h1>Poutsicle Hydrating Lip Stain.</h1>
                <div className="rating-review">
                  <div className="rating">
                    <div className="star">
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                    </div>
                    <p><a href="#reviews">(50 customer review)</a></p>
                  </div>
                </div>
                <p>Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only
                  placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet
                  Praesent commodo at massa eget suscipit. Utani vitae enim velit.</p>
                <h6>Availability: <span>Out of Stock</span></h6>
                <div className="price-area">
                  <p className="price">$150.00 <del>$200.00</del></p>
                </div>
                <div className="notify-me-form">
                  <form>
                    <div className="form-inner mb-25">
                      <input type="email" placeholder="*Your Email Address" />
                    </div>
                    <button type="submit" className="primary-btn1 hover-btn3">*Notify Me*</button>
                  </form>
                </div>
                <div className="product-info">
                  <ul className="product-info-list">
                    <li> <span>SKU:</span> 9852410</li>
                    <li> <span>Brand:</span> <Link legacyBehavior href="/shop"><a>Chanel</a></Link></li>
                    <li> <span>Category:</span> <Link legacyBehavior href="/shop"><a>Body</a></Link>, <Link legacyBehavior href="/shop"><a>Face</a></Link></li>
                  </ul>
                </div>
                <div className="payment-method">
                  <h6>Guaranted Safe Checkout</h6>
                  <ul className="payment-card-list">
                    <li><img src="/assets/img/inner-page/payment-img1.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img2.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img3.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img4.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img5.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img6.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-page/payment-img7.svg" alt="" /></li>
                  </ul>
                </div>
                <ul className="product-shipping-delivers">
                <li className="product-shipping">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 55 32">
                                    <path d="M14.9999 27.4286H10.4285C10.1254 27.4286 9.83471 27.3082 9.62038 27.0938C9.40605 26.8795 9.28564 26.5888 9.28564 26.2857C9.28564 25.9826 9.40605 25.6919 9.62038 25.4776C9.83471 25.2633 10.1254 25.1429 10.4285 25.1429H14.9999C15.303 25.1429 15.5937 25.2633 15.8081 25.4776C16.0224 25.6919 16.1428 25.9826 16.1428 26.2857C16.1428 26.5888 16.0224 26.8795 15.8081 27.0938C15.5937 27.3082 15.303 27.4286 14.9999 27.4286ZM52.1428 27.4286H49.2857C48.9825 27.4286 48.6919 27.3082 48.4775 27.0938C48.2632 26.8795 48.1428 26.5888 48.1428 26.2857C48.1428 25.9826 48.2632 25.6919 48.4775 25.4776C48.6919 25.2633 48.9825 25.1429 49.2857 25.1429H51.1942L52.7348 16.9326C52.7142 12.7314 49.1256 9.14286 44.7142 9.14286H37.2102L33.5736 25.1429H40.1428C40.4459 25.1429 40.7366 25.2633 40.9509 25.4776C41.1652 25.6919 41.2856 25.9826 41.2856 26.2857C41.2856 26.5888 41.1652 26.8795 40.9509 27.0938C40.7366 27.3082 40.4459 27.4286 40.1428 27.4286H32.1428C31.9713 27.4287 31.802 27.3902 31.6474 27.3159C31.4928 27.2417 31.3569 27.1336 31.2498 26.9997C31.1427 26.8657 31.067 26.7094 31.0285 26.5423C30.99 26.3752 30.9896 26.2016 31.0274 26.0343L35.1828 7.74858C35.2399 7.49542 35.3814 7.26924 35.5842 7.10723C35.7869 6.94521 36.0387 6.85702 36.2982 6.85715H44.7142C50.3851 6.85715 54.9999 11.472 54.9999 17.1429L53.2651 26.496C53.2165 26.7581 53.0776 26.9949 52.8726 27.1652C52.6676 27.3356 52.4094 27.4288 52.1428 27.4286Z" fill="#222222"></path>
                                    <path d="M44.7142 32C41.5645 32 39 29.4377 39 26.2857C39 23.1337 41.5645 20.5714 44.7142 20.5714C47.864 20.5714 50.4285 23.1337 50.4285 26.2857C50.4285 29.4377 47.864 32 44.7142 32ZM44.7142 22.8572C42.824 22.8572 41.2857 24.3954 41.2857 26.2857C41.2857 28.176 42.824 29.7143 44.7142 29.7143C46.6045 29.7143 48.1428 28.176 48.1428 26.2857C48.1428 24.3954 46.6045 22.8572 44.7142 22.8572ZM19.5714 32C16.4217 32 13.8571 29.4377 13.8571 26.2857C13.8571 23.1337 16.4217 20.5714 19.5714 20.5714C22.7211 20.5714 25.2857 23.1337 25.2857 26.2857C25.2857 29.4377 22.7211 32 19.5714 32ZM19.5714 22.8572C17.6811 22.8572 16.1428 24.3954 16.1428 26.2857C16.1428 28.176 17.6811 29.7143 19.5714 29.7143C21.4617 29.7143 23 28.176 23 26.2857C23 24.3954 21.4617 22.8572 19.5714 22.8572ZM15 6.85716H5.85711C5.554 6.85716 5.26331 6.73675 5.04899 6.52242C4.83466 6.30809 4.71425 6.0174 4.71425 5.7143C4.71425 5.41119 4.83466 5.1205 5.04899 4.90618C5.26331 4.69185 5.554 4.57144 5.85711 4.57144H15C15.3031 4.57144 15.5938 4.69185 15.8081 4.90618C16.0224 5.1205 16.1428 5.41119 16.1428 5.7143C16.1428 6.0174 16.0224 6.30809 15.8081 6.52242C15.5938 6.73675 15.3031 6.85716 15 6.85716ZM15 13.7143H3.57139C3.26829 13.7143 2.9776 13.5939 2.76327 13.3796C2.54894 13.1652 2.42854 12.8745 2.42854 12.5714C2.42854 12.2683 2.54894 11.9776 2.76327 11.7633C2.9776 11.549 3.26829 11.4286 3.57139 11.4286H15C15.3031 11.4286 15.5938 11.549 15.8081 11.7633C16.0224 11.9776 16.1428 12.2683 16.1428 12.5714C16.1428 12.8745 16.0224 13.1652 15.8081 13.3796C15.5938 13.5939 15.3031 13.7143 15 13.7143ZM15 20.5714H1.28568C0.982575 20.5714 0.691885 20.451 0.477557 20.2367C0.26323 20.0224 0.142822 19.7317 0.142822 19.4286C0.142822 19.1255 0.26323 18.8348 0.477557 18.6205C0.691885 18.4061 0.982575 18.2857 1.28568 18.2857H15C15.3031 18.2857 15.5938 18.4061 15.8081 18.6205C16.0224 18.8348 16.1428 19.1255 16.1428 19.4286C16.1428 19.7317 16.0224 20.0224 15.8081 20.2367C15.5938 20.451 15.3031 20.5714 15 20.5714Z"></path>
                                    <path d="M32.1428 27.4286H24.1428C23.8397 27.4286 23.549 27.3082 23.3347 27.0938C23.1203 26.8795 22.9999 26.5888 22.9999 26.2857C22.9999 25.9826 23.1203 25.6919 23.3347 25.4776C23.549 25.2633 23.8397 25.1429 24.1428 25.1429H31.2308L36.4239 2.28571H10.4285C10.1254 2.28571 9.83471 2.16531 9.62038 1.95098C9.40605 1.73665 9.28564 1.44596 9.28564 1.14286C9.28564 0.839753 9.40605 0.549063 9.62038 0.334735C9.83471 0.120408 10.1254 1.4297e-07 10.4285 1.4297e-07H37.8571C38.0286 -8.56294e-05 38.1979 0.0384228 38.3525 0.112672C38.507 0.186921 38.6429 0.295008 38.7501 0.42892C38.8572 0.562832 38.9328 0.719137 38.9713 0.886249C39.0098 1.05336 39.0102 1.227 38.9725 1.39429L33.2582 26.5371C33.2011 26.7903 33.0596 27.0165 32.8569 27.1785C32.6541 27.3405 32.4023 27.4287 32.1428 27.4286Z"></path>
                                </svg>
                                Free worldwide shipping on all orders over $100
                            </li>
                  <li className="product-delivers">
                  
                    <p>Delivers in: 3-7 Working Days <a href="#">Shipping &amp; Return</a></p>
                  </li>
                </ul>
                <div className="compare-wishlist-area">
                  <ul>
                    <li>
                      <a href="#">
                        <span>
                          <svg width={11} height={11} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_168_378)">
                              <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                            </g>
                          </svg>
                        </span>
                        Add to wishlist
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-details-description mb-110" id="reviews">
        <div className="container-xl container-lg-fluid container">
          <div className="row">
            <div className="col-12">
              <div className="shop-details-description-nav mb-50">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">Description</button>
                    <button className="nav-link" id="nav-add-info-tab" data-bs-toggle="tab" data-bs-target="#nav-add-info" type="button" role="tab" aria-controls="nav-add-info" aria-selected="false">Additional Information</button>
                    <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">Reviews (15)</button>
                  </div>
                </nav>
              </div>
              <div className="shop-details-description-tab">
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                    <div className="row gy-5">
                      <div className="col-lg-3">
                        <div className="description-content">
                          <div className="description-left-content1">
                            <h6>Lobortis arcu varius sed</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                          <div className="description-left-content2">
                            <h6>Mauris arcu mollis nulla</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="description-tab-img">
                          <img src="/assets/img/inner-page/shop-details-description-img.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="description-content">
                          <div className="description-right-content1">
                            <h6>Etiam vitae malesu adan</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                          <div className="description-right-content2">
                            <h6>Nam tempor laoreet conv</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-add-info" role="tabpanel" aria-labelledby="nav-add-info-tab">
                    <div className="addithonal-information">
                      <table className="table total-table2">
                        <tbody>
                          <tr>
                            <td>SKU</td>
                            <td>123ABC</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>Nail Polish</td>
                          </tr>
                          <tr>
                            <td>Tags</td>
                            <td>Nail Care, Nail Art</td>
                          </tr>
                          <tr>
                            <td>Weight</td>
                            <td>20 gm</td>
                          </tr>
                          <tr>
                            <td>Dimensions</td>
                            <td>2 × 4 × 5 cm</td>
                          </tr>
                          <tr>
                            <td>Brand</td>
                            <td>Revlon </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                    <div className="review-area">
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="comment-section style-2">
                            <div className="comment-title">
                              <h3>Review (02) :</h3>
                            </div>
                            <ul className="author-comment mb-100">
                              <li>
                                <div className="author-img">
                                  <img src="/assets/img/inner-page/comment-author1.png " alt="" />
                                </div>
                                <div className="comment-content">
                                  <div className="author-post style-2">
                                    <div className="author-info">
                                      <h5>Polard Girdet, <span> 02 June,2023</span></h5>
                                    </div>
                                    <ul className="rating">
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                    </ul>
                                  </div>
                                  <p>Odio tellus, dignissim fermentumara purus nec, consequat dapibus metus.Vivamusut urna world classo mauris, faucibus at egestas quis, fermentum egetonav neque. Duisonajt pharetra lectus nec risusonota and we are always support our customer support available.</p>
                                  <a href="#" className="replay-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                      <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                    </svg>
                                    Reply (02)
                                  </a>
                                </div>
                              </li>
                              <li>
                                <div className="author-img">
                                  <img src="/assets/img/inner-page/comment-author2.png " alt="" />
                                </div>
                                <div className="comment-content">
                                  <div className="author-post style-2">
                                    <div className="author-info">
                                      <h5>James Jordan,  <span> 04 June,2023</span></h5> 
                                    </div>  
                                    <ul className="rating">
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star-fill" /></li>
                                      <li><i className="bi bi-star" /></li>
                                    </ul>
                                  </div>
                                  <p>Odio tellus, dignissim fermentumara purus nec, consequat dapibus metus.Vivamusut urna world classo mauris, faucibus at egestas quis, fermentum egetonav neque. Duisonajt pharetra lectus nec risusonota and we are always support our customer support available.</p>
                                  <a href="#" className="replay-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                      <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                    </svg>
                                    Reply (02)
                                  </a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="comment-section style-3">
                            <div className="comment-title">
                              <h3>Write Your Review</h3>
                            </div>
                            <p>Your email adress will be save &amp; secure, Also not published.</p>
                            <form className="contact-form">
                              <div className="row">
                                <div className="col-lg-12 mb-20">
                                  <div className="form-inner2 mb-10">
                                    <div className="review-rate-area">
                                      <p>Your Rating:</p>
                                      <div className="rate">
                                        <input type="radio" id="star5" name="rate" defaultValue={5} />
                                        <label htmlFor="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" defaultValue={4} />
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" defaultValue={3} />
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" defaultValue={2} />
                                        <label htmlFor="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" defaultValue={1} />
                                        <label htmlFor="star1" title="text">1 star</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-inner mb-20">
                                    <textarea rows={5} placeholder="Your Reviews *" defaultValue={""} />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-inner mb-20">
                                    <input type="text" placeholder="Enter Your Name" />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="form-inner mb-20">
                                    <input type="email" placeholder="Enter your email" required />
                                  </div>
                                </div>
                                <div className="col-md-12 pt-30">
                                  <button type="submit" className="primary-btn1 hover-btn3">Submit</button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewestProduct />
      <GiftSection />
    </>
  )
}

export default OutOfStock
