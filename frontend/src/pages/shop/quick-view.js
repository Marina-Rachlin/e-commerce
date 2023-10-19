import React, { useState } from 'react'
import Link from 'next/link';
import GiftSection from '@/src/components/common/GiftSection'
import ProductViewModal from '@/src/components/common/ProductViewModal'
import SelectComponent from '@/src/components/common/SelectComponent';
import { useCountdownTimer } from '@/src/hooks/useCountdownTimer';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}
const QuickView = () => {
  const [activeColumn, setActiveColumn] = useState('column-4'); // Initialize activeColumn to 'column-1'
  const handleColumnClick = (column) => {
     setActiveColumn(column);
   };
   const [value, setValue] = useState([20, 37]);
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
   
  const endTime = "2023-10-23";
  const { days, hours, minutes, seconds } = useCountdownTimer(endTime)

  return (
    <>
    <div className="left-sidebar-section column-sidebar-padding mt-110 mb-110">
       <div className="container-fluid">
         <div className="row gy-5 justify-content-center">
           <div className="col-xl-3 col-md-8">
             <div className="sidebar-area">
               <div className="shop-widget mb-30">
                 <h5 className="shop-widget-title">Price Filter</h5>
                 <Box sx={{xs:'100%', sm:'50%', md:'33.33%', lg:'25%', xl:'20%',}}>
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={value}
                      sx={{
                        color: '#222222', // Change the color here
                      }}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                    <div className="range-wrap">
                    <div className="slider-labels">
                  <div className="caption">
                    <span id="slider-range-value1" >${value[0]}</span>
                  </div>
                  <a href="#">Apply</a>
                  <div className="caption">
                    <span id="slider-range-value2" >${value[1]}</span>
                  </div>
                </div>
                </div>
              </Box>
               </div>
               <div className="shop-widget mb-30">
                 <div className="check-box-item">
                   <h5 className="shop-widget-title">Categories</h5>
                   <ul className="shop-item">
                     <li>
                       <Link legacyBehavior href="/shop"><a>All Product</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Healthy &amp; Natural</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Beauty &amp; Cosmetics</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Selfcare Veggies</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Personal Care</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Men’s Collections</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>kids &amp; Baby Set</a></Link>
                     </li>
                     <li>
                       <Link legacyBehavior href="/shop"><a>Summer product</a></Link>
                     </li>
                   </ul>
                 </div>
               </div>
               <div className="shop-widget mb-30">
                 <div className="check-box-item">
                   <h5 className="shop-widget-title">Our Brand </h5>
                   <ul className="shop-item">
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Nivea
                         <span>50</span>
                        </a>
                       </Link>  
                     </li>
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Loreal
                         <span>35</span>
                        </a>
                       </Link>
                     </li>
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Gillette
                         <span>20</span>
                        </a>
                       </Link>
                     </li>
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Garnier
                         <span>18</span>
                        </a>
                       </Link>
                     </li>
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Cetaphil
                         <span>06</span>
                        </a>
                       </Link>
                     </li>
                     <li className="brand-list">
                       <Link legacyBehavior href="/shop">
                        <a>
                        Aveeno
                         <span>08</span>
                        </a>
                       </Link>
                     </li>
                   </ul>
                 </div>
               </div>
               <div className="shop-widget">
                 <h5 className="shop-widget-title">Top Rated Product</h5>
                 <div className="top-product-widget mb-20">
                   <div className="top-product-img">
                     <Link legacyBehavior href="/shop/product-default"><a><img src="/assets/img/inner-page/top-product1.png" alt="" /></a></Link>
                   </div>
                   <div className="top-product-content">
                     <h6><Link legacyBehavior href="/shop/product-default"><a>Estee Lauder new Body Lotion</a></Link></h6>
                     <span>$150.00 <del>$200.00</del></span>
                   </div>
                 </div>
                 <div className="top-product-widget mb-20">
                   <div className="top-product-img">
                     <Link legacyBehavior href="/shop/product-default"><a><img src="/assets/img/inner-page/top-product2.png" alt="" /></a></Link>
                   </div>
                   <div className="top-product-content">
                     <h6><Link legacyBehavior href="/shop/product-default"><a>Argan &amp; Olive Nature organ Oil</a></Link></h6>
                     <span>$130.00 <del>$200.00</del></span>
                   </div>
                 </div>
                 <div className="top-product-widget">
                   <div className="top-product-img">
                     <Link legacyBehavior href="/shop/product-default"><a><img src="/assets/img/inner-page/top-product3.png" alt="" /></a></Link>
                   </div>
                   <div className="top-product-content">
                     <h6><Link legacyBehavior href="/shop/product-default"><a>Char Pull black &amp; gray Face Mask</a></Link></h6>
                     <span>$110.00 <del>$200.00</del></span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-xl-9">
             <div className="shop-columns-title-section mb-40">
               <p>Showing 1–12 of 101 results</p>
               <div className="filter-selector">
                 <div className="selector two">
                 <SelectComponent options={["Price Low to High","Price High to Low"]} placeholder="Default Sorting"/>
                 </div>
                 <ul className="grid-view">
          <li className={activeColumn === 'column-2' ? 'active' : ''} onClick={() => handleColumnClick('column-2')}>
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} viewBox="0 0 12 20">
              <g>
                <rect width="4.88136" height="5.10638" rx="2.44068" />
                <rect y="7.44678" width="4.88136" height="5.10638" rx="2.44068" />
                <rect y="14.8937" width="4.88136" height="5.10638" rx="2.44068" />
                <rect x="7.11865" width="4.88136" height="5.10638" rx="2.44068" />
                <rect x="7.11865" y="7.44678" width="4.88136" height="5.10638" rx="2.44068" />
                <rect x="7.11865" y="14.8937" width="4.88136" height="5.10638" rx="2.44068" />
              </g>
            </svg>
          </li>
          <li className={activeColumn === 'column-3' ? 'active' : ''} onClick={() => handleColumnClick('column-3')}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
              <g clipPath="url(#clip0_1610_1442)">
                <rect width="5.10638" height="5.10638" rx="2.55319" />
                <rect y="7.44678" width="5.10638" height="5.10638" rx="2.55319" />
                <rect y="14.8937" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="7.44678" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="7.44678" y="7.44678" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="7.44678" y="14.8937" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="14.8936" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="14.8936" y="7.44678" width="5.10638" height="5.10638" rx="2.55319" />
                <rect x="14.8936" y="14.8937" width="5.10638" height="5.10638" rx="2.55319" />
              </g>
            </svg>
          </li>
          <li className={activeColumn === 'column-4' ? 'active' : ''} onClick={() => handleColumnClick('column-4')}>
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
              <g clipPath="url(#clip0_1610_1453)">
                <rect width="3.64741" height="3.64741" rx="1.8237" />
                <rect y="8.17627" width="3.64741" height="3.64741" rx="1.8237" />
                <rect y={16} width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="5.31909" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="5.31909" y="8.17627" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="5.31909" y={16} width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="10.6382" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="16.3525" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="10.6384" y="8.17627" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="16.3525" y="8.17627" width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="10.6382" y={16} width="3.64741" height="3.64741" rx="1.8237" />
                <rect x="16.3525" y={16} width="3.64741" height="3.64741" rx="1.8237" />
              </g>
            </svg>
          </li>
        </ul>
               </div>
             </div>
             <div className={`all-products list-grid-product-wrap `}>
               <div className="row gy-4 mb-80 ">
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img double-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-4.png" alt="" className="img1" />
                         <img src="/assets/img/home1/product-img-7.png" alt="" className="img2" />
                         <div className="countdown-timer">
                         <ul data-countdown={endTime}>
                            <li className="times" data-days={days}>{days}D</li>
                            <li>
                              :
                            </li>
                            <li className="times" data-hours={hours}>{hours}H</li>
                            <li>
                              :
                            </li>
                            <li className="times" data-minutes={minutes}>{minutes}M</li>
                            <li>
                              :
                            </li>
                            <li className="times" data-seconds={seconds}>{seconds}S</li>
                          </ul>
                         </div>
                         <div className="batch">
                           <span>-15%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Botanical hair Shampoo </a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Radiant Vibe</a></Link></p>
                       <p className="price">$150.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-5.png" alt="" />
                         <div className="batch">
                           <span className="new">New</span>
                         </div>
                        </a>
                       </Link>
                       <div className="out-of-stock">
                         <span>Out Of Stock</span>
                       </div>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/out-of-stock"><a  className="hover-btn3 add-cart-btn ">Request Stock</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Bamboo Fibers Shampoo</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Glow Flair</a></Link></p>
                       <p className="price">$145.00</p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-6.png" alt="" />
                         <div className="batch">
                           <span>-14%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/product-with-size-variation"><a  className="hover-btn3 add-cart-btn">Select options</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Organic vitamin cream</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>pantene</a></Link></p>
                       <p className="price">$140.00 <del>$200.00</del></p>
                       <ul className="product-size">
                         <li>250 ml</li>
                         <li>500 ml</li>
                         <li>1000 ml</li>
                         <li>1500 ml</li>
                       </ul>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-15.png" alt="" />
                         <div className="batch">
                           <span>-10%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Eau de perfume for women</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Belle Luxe</a></Link></p>
                       <p className="price">$135.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img double-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-16.png" alt="" className="img1" />
                         <img src="/assets/img/home1/product-img-3.png" alt="" className="img2" />
                         <div className="batch">
                           <span>-18%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Poutsicle Hydrating Lip Stain.</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Elevate Glow</a></Link></p>
                       <p className="price">$130.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-7.png" alt="" />
                         <div className="batch">
                           <span className="new">New</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">huile de Hemp seed olive oil</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>REVLON</a></Link></p>
                       <p className="price">$125.00</p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-21.png" alt="" />
                         <div className="batch">
                           <span className="new">New</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                        <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">curology face cleanser</a></Link></h6>                       <p><Link legacyBehavior href="/shop"><a>Pure Glam</a></Link></p>
                       <p className="price">$120.00</p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-14.png" alt="" />
                         <div className="batch">
                           <span>-18%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a className="hover-underline">Coconut balm skin salve</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Divine Aura</a></Link></p>
                       <p className="price">$115.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-9.png" alt="" />
                         <div className="batch">
                           <span>-15%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a className="hover-underline">Cucumber Green Tea</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Luminara</a></Link></p>
                       <p className="price">$110.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-11.png" alt="" />
                         <div className="batch">
                           <span>-10%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a  className="hover-underline">Vitamin c face cleanser</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Elysian Glow</a></Link></p>
                       <p className="price">$105.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-18.png" alt="" />
                         <div className="batch">
                           <span className="new">New</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a className="hover-underline">bleu chanel de perfume</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Velvet Aura</a></Link></p>
                       <p className="price">$110.00</p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
                 <div className={`col${activeColumn === 'column-4'?"-lg-3":activeColumn==="column-3"?"-md-4":activeColumn==="column-2"?"-sm-6":"nop"}`}>
                   <div className="product-card style-3 hover-btn">
                     <div className="product-card-img">
                       <Link legacyBehavior href="/shop">
                        <a>
                         <img src="/assets/img/home1/product-img-20.png" alt="" />
                         <div className="batch">
                           <span>-15%</span>
                         </div>
                        </a>
                       </Link>
                       <div className="overlay">
                         <div className="cart-area">
                           <Link legacyBehavior href="/shop/cart"><a  className="hover-btn3 add-cart-btn"><i className="bi bi-bag-check" /> Add To Cart</a></Link>
                         </div>
                       </div>
                       <div className="view-and-favorite-area">
                         <ul>
                           <li>
                             <Link legacyBehavior href="/shop/whistlist">
                              <a>
                               <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18">
                                 <g clipPath="url(#clip0_168_378)">
                                   <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                                 </g>
                               </svg>
                              </a>
                             </Link>
                           </li>
                           <li>
                             <a data-bs-toggle="modal" data-bs-target="#product-view">
                               <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22">
                                 <path d="M21.8601 10.5721C21.6636 10.3032 16.9807 3.98901 10.9999 3.98901C5.019 3.98901 0.335925 10.3032 0.139601 10.5718C0.0488852 10.6961 0 10.846 0 10.9999C0 11.1537 0.0488852 11.3036 0.139601 11.4279C0.335925 11.6967 5.019 18.011 10.9999 18.011C16.9807 18.011 21.6636 11.6967 21.8601 11.4281C21.951 11.3039 21.9999 11.154 21.9999 11.0001C21.9999 10.8462 21.951 10.6963 21.8601 10.5721ZM10.9999 16.5604C6.59432 16.5604 2.77866 12.3696 1.64914 10.9995C2.77719 9.62823 6.58487 5.43955 10.9999 5.43955C15.4052 5.43955 19.2206 9.62969 20.3506 11.0005C19.2225 12.3717 15.4149 16.5604 10.9999 16.5604Z" />
                                 <path d="M10.9999 6.64832C8.60039 6.64832 6.64819 8.60051 6.64819 11C6.64819 13.3994 8.60039 15.3516 10.9999 15.3516C13.3993 15.3516 15.3515 13.3994 15.3515 11C15.3515 8.60051 13.3993 6.64832 10.9999 6.64832ZM10.9999 13.9011C9.40013 13.9011 8.09878 12.5997 8.09878 11C8.09878 9.40029 9.40017 8.0989 10.9999 8.0989C12.5995 8.0989 13.9009 9.40029 13.9009 11C13.9009 12.5997 12.5996 13.9011 10.9999 13.9011Z" />
                               </svg>
                             </a>
                           </li>
                         </ul>  
                       </div>
                     </div>
                     <div className="product-card-content">
                       <h6><Link legacyBehavior href="/shop/product-default"><a className="hover-underline">les beiges eau de lipistick</a></Link></h6>
                       <p><Link legacyBehavior href="/shop"><a>Aurora Belle</a></Link></p>
                       <p className="price">$90.00 <del>$200.00</del></p>
                       <div className="rating">
                         <ul>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                           <li><i className="bi bi-star-fill" /></li>
                         </ul>
                         <span>(50)</span>
                       </div>
                     </div>
                     <span className="for-border" />
                   </div>
                 </div>
               </div>
             </div>
             <nav className="shop-pagination">
               <ul className="pagination-list">
                 <li>
                   <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-left" /></a>
                 </li>
                 <li>
                   <a href="#">1</a>
                 </li>
                 <li>
                   <a href="#" className="active">2</a>
                 </li>
                 <li>
                   <a href="#">3</a>
                 </li>
                 <li>
                   <a href="#"><i className="bi bi-three-dots" /></a>
                 </li>
                 <li>
                   <a href="#">6</a>
                 </li>
                 <li>
                   <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-right" /></a>
                 </li>
               </ul>
             </nav>
           </div>
         </div>
       </div>
     </div>
     <ProductViewModal/>
     <GiftSection />
   </>
  )
}

export default QuickView
