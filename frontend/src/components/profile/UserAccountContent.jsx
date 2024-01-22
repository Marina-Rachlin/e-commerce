'use client'
import React from 'react';
import SelectComponent from '../common/SelectComponent';
import ProfileSection from './ProfileSection';

function UserAccountContent({ user, initials, imageHandler, handleSubmit }) {
  return (
    <div className="col-lg-9">
      <div className="tab-content" id="v-pills-tabContent">
        <DashboardSection user={user} />
        <ProfileSection user={user} initials={initials} imageHandler={imageHandler} onSubmit={handleSubmit} />
        <OrderTrackingSection />
        <PurchaseSection />
      </div>
    </div>
  );
}

function DashboardSection({ user }) {
  return (
    <div className="tab-pane fade show active" id="v-pills-dashboard" role="tabpanel" aria-labelledby="v-pills-dashboard-tab">
      <div className="dashboard-area box--shadow">
        <p>
          Hello, <strong>{user?.name} !</strong>
        </p>
        <p>Welcome to your account!</p>
      </div>
    </div>
  );
}

function OrderTrackingSection() {
  return (
    <div className="tab-pane fade" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab">
       <div className="order-traking-area">
                  <h3>Order Tracking</h3>
                    <p>
                      To track your order please enter your Order ID in the box
                      below and press the "Track" button. This given to you on
                      your receipt and in the confirmation email you should have
                      received.
                    </p>
                    <form>
                      <div className="row justify-content-center">
                        <div className="col-md-8 mb-25">
                          <div className="form-inner">
                            <label>Order ID</label>
                            <input
                              type="text"
                              placeholder="Enter your order ID"
                            />
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-inner">
                            <label>Billing Email</label>
                            <input type="text" placeholder="Enter your email" />
                          </div>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center">
                          <div className="button-group">
                            <button
                              type="submit"
                              className="primary-btn3 black-bg  hover-btn5 hover-white"
                            >
                              Track
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
    </div>
  );
}

function PurchaseSection() {
  return (
    <div className="tab-pane fade" id="v-pills-purchase" role="tabpanel" aria-labelledby="v-pills-purchase-tab">
        {/* table title*/}
        <div className="table-title-area">
                    <h3>My Order</h3>
                    <SelectComponent
                      options={[
                        "Show: Last 05 Order",
                        "Show: Last 03 Order",
                        "Show: Last 15 Order",
                        "Show: Last 20 Order",
                      ]}
                      placeholder="orders"
                    />
                  </div>
                  {/* table */}
                  <div className="table-wrapper">
                    <table className="eg-table order-table table mb-0">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Order ID</th>
                          <th>Product Details</th>
                          <th>price</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-label="Image">
                            <img
                              alt="image"
                              src="/assets/img/inner-page/whistlist-img1.png"
                              className="img-fluid"
                            />
                          </td>
                          <td data-label="Order ID">#4ce345c3e</td>
                          <td data-label="Product Details">
                            Eau De Blue Perfume
                          </td>
                          <td data-label="price">$40.00</td>
                          <td data-label="Status" className="text-green">
                            Shipped
                          </td>
                        </tr>
                        <tr>
                          <td data-label="Image">
                            <img
                              alt="image"
                              src="/assets/img/inner-page/whistlist-img2.png"
                              className="img-fluid"
                            />
                          </td>
                          <td data-label="Order ID">#4ce3533e</td>
                          <td data-label="Product Details">
                            Smooth Makeup Box
                          </td>
                          <td data-label="price">$25.00</td>
                          <td data-label="Status" className="text-red">
                            Pending
                          </td>
                        </tr>
                        <tr>
                          <td data-label="Image">
                            <img
                              alt="image"
                              src="/assets/img/inner-page/whistlist-img3.png"
                              className="img-fluid"
                            />
                          </td>
                          <td data-label="Order ID">#8ce3533e</td>
                          <td data-label="Product Details">
                            Modern Red Lipstick{" "}
                          </td>
                          <td data-label="price">$32.00</td>
                          <td data-label="Status" className="text-red">
                            Pending
                          </td>
                        </tr>
                        <tr>
                          <td data-label="Image">
                            <img
                              alt="image"
                              src="/assets/img/inner-page/whistlist-img4.png"
                              className="img-fluid"
                            />
                          </td>
                          <td data-label="Order ID">#8ce3533e</td>
                          <td data-label="Product Details">
                            New Botanical Shampoo
                          </td>
                          <td data-label="price">$27.00</td>
                          <td data-label="Status" className="text-green">
                            Shipped
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* pagination area */}
                  <div className="table-pagination">
                    <p>Showing 10 to 20 of 1 entries</p>
                    <nav className="shop-pagination">
                      <ul className="pagination-list">
                        <li>
                          <a href="#" className="shop-pagi-btn">
                            <i className="bi bi-chevron-left" />
                          </a>
                        </li>
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#" className="active">
                            2
                          </a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bi bi-three-dots" />
                          </a>
                        </li>
                        <li>
                          <a href="#">6</a>
                        </li>
                        <li>
                          <a href="#" className="shop-pagi-btn">
                            <i className="bi bi-chevron-right" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
    </div>
  );
}

export default UserAccountContent;
