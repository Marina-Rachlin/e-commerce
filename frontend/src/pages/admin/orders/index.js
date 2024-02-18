import React from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import MenuToggler from "../../../components/admin/MenuToggler";
import OrdersTable from "./OrdersTable";


const ordersPage = () => {
  return (
    <AdminLayout>
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Orders List" />
          <MenuToggler />

          <div className="row" style={{margin: '0 -24px'}}>
            <OrdersTable />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ordersPage;
