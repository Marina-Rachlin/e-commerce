import React from "react";
import DashboardHeader from "../../components/admin/header/DashboardHeader";
import MobileMenu from "../../components/admin/mobileMenu/MobileMenu";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import CopyrightFooter from "../../components/admin/footer/CopyrightFooter";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  return (
       <div className="admin-section">
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>

        <DashboardHeader user = {user} />
        <MobileMenu />
        <AdminSidebar />

        {children}

        <CopyrightFooter />
      </div>
    </div>
  );
};

export default AdminLayout;

