import React from 'react'
import GiftSection from '@/src/components/common/GiftSection'
import ProductViewModal from '@/src/components/common/ProductViewModal'
import QuantityCounter from '@/src/uitils/QuantityCounter';
const Cart = () => {
  return (
    <>
      <div className="whistlist-section cart mt-110 mb-110">
        <div className="container">
          <div className="row mb-50">
            <div className="col-12">
              <div className="whistlist-table">
                <table className="eg-table2">
                  <thead>
                    <tr>
                      <th />
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="delete-icon">
                          <i className="bi bi-x-lg" />
                        </div>
                      </td>
                      <td data-label="Product" className="table-product">
                        <div className="product-img">
                          <img src="/assets/img/inner-page/whistlist-img1.png" alt="" />
                        </div>
                        <div className="product-content">
                          <h6><a href="#">Eau De Blue Perfume</a></h6>
                        </div>
                      </td>
                      <td data-label="Price">
                        <p className="price">
                          <del>$40.00</del>
                          $30.00
                        </p>
                      </td>
                      <td data-label="Quantity">
                        <QuantityCounter/>
                      </td>
                      <td data-label="Total">
                        $30.00
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="delete-icon">
                          <i className="bi bi-x-lg" />
                        </div>
                      </td>
                      <td data-label="Product" className="table-product">
                        <div className="product-img">
                          <img src="/assets/img/inner-page/whistlist-img2.png" alt="" />
                        </div>
                        <div className="product-content">
                          <h6><a href="#">Smooth Makeup Box</a></h6>
                        </div>
                      </td>
                      <td data-label="Price">
                        <p className="price">
                          <del>$40.00</del>
                          $25.00
                        </p>
                      </td>
                      <td data-label="Quantity">
                      <QuantityCounter/>
                      </td>
                      <td data-label="Total">
                        $50.00
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="delete-icon">
                          <i className="bi bi-x-lg" />
                        </div>
                      </td>
                      <td data-label="Product" className="table-product">
                        <div className="product-img">
                          <img src="/assets/img/inner-page/whistlist-img3.png" alt="" />
                        </div>
                        <div className="product-content">
                          <h6><a href="#">Modern Red Lipstick</a></h6>
                        </div>
                      </td>
                      <td data-label="Price">
                        <p className="price">
                          <del>$40.00</del>
                          $32.00
                        </p>
                      </td>
                      <td data-label="Quantity">
                      <QuantityCounter/>
                      </td>
                      <td data-label="Total">
                        $30.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="coupon-area">
                <div className="cart-coupon-input">
                  <h5>Coupon Code</h5>
                  <form>
                    <div className="form-inner">
                      <input type="text" placeholder="Coupon Code" />
                      <button type="submit" className="primary-btn1 hover-btn3">Apply Code</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th />
                    <th>$128.70</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Shipping</td>
                    <td>
                      <ul className="cost-list text-start">
                        <li>Shipping Fee</li>
                        <li>Total ( tax excl.)</li>
                        <li>Total ( tax incl.)</li>
                        <li>Taxes</li>
                        <li>Shipping Enter your address to view shipping options. <br /> <a href="#">Calculate
                            shipping</a>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className="single-cost text-center">
                        <li>Fee</li>
                        <li>$15</li>
                        <li />
                        <li>$15</li>
                        <li>$15</li>
                        <li>$5</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td />
                    <td>$162.70</td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" className="primary-btn1 hover-btn3">Product Checkout</button>
            </div>
          </div>
        </div>
    </div>
    <ProductViewModal/>
    <GiftSection /> 
    </>
  )
}

export default Cart
