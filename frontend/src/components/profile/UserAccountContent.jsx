"use client";
import React, { useEffect, useState } from "react";
import SelectComponent from "../common/SelectComponent";
import ProfileSection from "./ProfileSection";
import { useGetMyOrdersQuery } from "../../redux/features/orders/orderApi";
import { useSelector } from "react-redux";

function UserAccountContent({ user, initials, imageHandler, handleSubmit }) {
  return (
    <div className="col-lg-9">
      <div className="tab-content" id="v-pills-tabContent">
        <DashboardSection user={user} />
        <ProfileSection
          user={user}
          initials={initials}
          imageHandler={imageHandler}
          onSubmit={handleSubmit}
        />
        <OrderTrackingSection />
        <PurchaseSection />
      </div>
    </div>
  );
}

function DashboardSection({ user }) {
  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-dashboard"
      role="tabpanel"
      aria-labelledby="v-pills-dashboard-tab"
    >
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
    <div
      className="tab-pane fade"
      id="v-pills-order"
      role="tabpanel"
      aria-labelledby="v-pills-order-tab"
    >
      <div className="order-traking-area">
        <h3>Order Tracking</h3>
        <p>
          To track your order please enter your Order ID in the box below and
          press the "Track" button. This given to you on your receipt and in the
          confirmation email you should have received.
        </p>
        <form>
          <div className="row justify-content-center">
            <div className="col-md-8 mb-25">
              <div className="form-inner">
                <label>Order ID</label>
                <input type="text" placeholder="Enter your order ID" />
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
  const { data, isLoading, error } = useGetMyOrdersQuery();
  const [orders, setOrders] = useState([]);
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (data) {
      setOrders(data.orders);
    } else {
      console.log(error);
    }
  }, [isLoading, data, error]);

  return (
    <div
      className="tab-pane fade"
      id="v-pills-purchase"
      role="tabpanel"
      aria-labelledby="v-pills-purchase-tab"
    >
      {/* table title*/}
      <div className="table-title-area">
        <h3>My Order</h3>
        <SelectComponent
          options={[
            "Last 05 Order",
            "Last 03 Order",
            "Last 15 Order",
            "Last 20 Order",
          ]}
          placeholder="orders"
        />
      </div>

      <div className="table-wrapper"> 
          {orders &&
            orders.length > 0 &&
            [...orders].reverse().map((order) => (
              <div className="table-wrapper">
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h3>Order ID: {order._id}</h3>
                  <p>
                    Created At: {new Date(order.paidAt).toLocaleDateString()}
                  </p>
                  <p className="order-status">
                    Status: <span>{order.status}</span>
                  </p>
                </div>
                <table className="eg-table order-table table mb-0">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Details</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart.map((item) => (
                      <tr key={item.productId._id}>
                        <td data-label="Image">
                          <img
                            alt={item.productId.name}
                            src={item.productId.images[0].url}
                            className="img-fluid"
                          />
                        </td>
                        <td data-label="Product Details">
                          {item.productId.name}
                        </td>
                        <td data-label="Price">${item.productId.price}</td>
                        <td data-label="Quantity">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            ))}
        </div>

        {orders.length > 0 ? (<div className="table-pagination">
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
      </div>) : (
        <p>There is no orders yet</p>
      ) }
            
   
      {/* pagination area */}
      {/* <div className="table-pagination">
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
      </div> */}
    </div>
  );
}

export default UserAccountContent;
