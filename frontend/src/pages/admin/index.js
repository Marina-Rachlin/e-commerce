import React from 'react';
import AdminLayout from '../../layout/admin/AdminLayout';
import BreadCrumb from '../../components/admin/BreadCrumb';
import MenuToggler from '../../components/admin/MenuToggler';

const Admin = () => {

  return (
    <>
    <AdminLayout>
     <div className="admin-section container user-dashboard">
        <div className="dashboard-outer">

          <BreadCrumb title="Dashboard Home!" />
          <MenuToggler />

          <div className="row">{/* <TopCardBlock /> */}</div>

          <div className="row">
            <div className="col-xl-7 col-lg-12">
              {/* <!-- Graph widget --> */}
              <div className="graph-widget ls-widget">
                {/* <ProfileChart /> */}
              </div>
              {/* End profile chart */}
            </div>
            {/* End .col */}
          </div>
          {/* End .row profile and notificatins */}
        </div>
        {/* End dashboard-outer */}
      </div>
      {/* <!-- End Dashboard --> */}
      
    </AdminLayout>
    
    </>
  );
};


export default Admin
