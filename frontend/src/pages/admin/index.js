import React from 'react';
import AdminLayout from '../../layout/admin/AdminLayout';
import BreadCrumb from '../../components/admin/BreadCrumb';
import MenuToggler from '../../components/admin/MenuToggler';
import TopCardBlock from './dashboard/TopCardBlock';
import Chart from './dashboard/Chart';
import Notifications from './dashboard/Notifications';

const Admin = () => {

  return (
    <>
    <AdminLayout>
     <div className="admin-section container user-dashboard">
        <div className="dashboard-outer">

          <BreadCrumb title="Dashboard Home!" />
          <MenuToggler />

          <div className="row">
            <TopCardBlock />
          </div>

          <div className="row">
            <div className="col-xl-7 col-lg-12">
              <div className="graph-widget ls-widget">
                <Chart />
              </div>
            </div>
            {/* End .col */}

            <div className="col-xl-5 col-lg-12">
              {/* <!-- Notification Widget --> */}
              <div className="notification-widget ls-widget">
                <div className="widget-title">
                  <h4>Recent Transactions</h4>
                </div>
                <div className="widget-content">
                 
                </div>
              </div>
            </div>
      
           
          </div>
          {/* End .row profile and notificatins */}
        </div>
      </div>
      
    </AdminLayout>
    
    </>
  );
};


export default Admin
