import React from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import RolesTable from "./RolesTable";

const index = () => {

  return (
    <AdminLayout>
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Manage Team" />
          <div className="row">
            <RolesTable />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default index;
