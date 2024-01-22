import React from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import MenuToggler from "../../../components/admin/MenuToggler";
import RolesTable from '../../../views/roles/RolesTable';

const index = () => {
  return (
    <AdminLayout>
      <MenuToggler />
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
