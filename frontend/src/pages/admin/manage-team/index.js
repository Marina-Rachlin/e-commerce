import React from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import RolesTable from "./RolesTable";
import Script from "next/script";

const index = () => {

  return (
    <>
     <Script async src="https://www.googletagmanager.com/gtag/js?id=G-81GLR4VQK9"></Script>
      <Script>
        {
          ` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-81GLR4VQK9');`
        }
      </Script>
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
    </>
  );
};

export default index;
