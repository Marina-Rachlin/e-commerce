import React from 'react';
import AdminLayout from '../../layout/admin/AdminLayout';
import BreadCrumb from '../../components/admin/BreadCrumb';
import MenuToggler from '../../components/admin/MenuToggler';
import TopCardBlock from './dashboard/TopCardBlock';
import Chart from './dashboard/Chart';
import OutOfStockProducts from './dashboard/OutOfStockProducts';
import LineChartDiagram from './analytics/orders/LineChartDiagram';
import Script from 'next/script';
import Head from 'next/head';

const Admin = ({children}) => {


  const analyticsData = [
    {
      name: "Jan",
      Count: 4000,
    },
    {
      name: "Feb",
      Count: 3000,
    },
    {
      name: "Mar",
      Count: 5000,
    },
    {
      name: "April",
      Count: 1000,
    },
    {
      name: "May",
      Count: 4000,
    },
    {
      name: "June",
      Count: 800,
    },
    {
      name: "July",
      Count: 200,
    },
    {
      name: "Aug",
      Count: 4000,
    },
    {
      name: "Sept",
      Count: 800,
    },
    {
      name: "Oct",
      Count: 200,
    },
    {
      name: "Nov",
      Count: 800,
    },
    {
      name: "Dec",
      Count: 200,
    },
  ];

  return (
    <>
       <Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-81GLR4VQK9"></Script>
    <Script>
      {
        ` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-81GLR4VQK9');`
      }
    </Script>
    </Head>
    <AdminLayout>
     <div className="admin-section container user-dashboard">
        <div className="dashboard-outer">

          <BreadCrumb title="Dashboard Home!" />
          <MenuToggler />

          <div className="row">
            <TopCardBlock />
            {children}
          </div>

          <div className="row">
            <div className="col-xl-7 col-lg-12">
              <div className="graph-widget ls-widget">
                <Chart />
              </div>
            </div>
       

            <div className="col-xl-5 col-lg-12">
              <div className="notification-widget ls-widget">
                <div className="widget-title" style={{paddingBottom: '5px'}}>
                  <h4>Recent Transactions</h4>
                </div>
                <div className="widget-content" style={{padding: '0'}}>
                  <OutOfStockProducts />
                </div>
              </div>
            </div>

            <div className="col-xl-12 col-lg-12">
              <div className="notification-widget ls-widget">
              <div className="widget-title" >
                <h4> Orders Analytics</h4>
                </div>
                <div className="widget-content">
                  <LineChartDiagram  data= {analyticsData} />
             
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
      
    </AdminLayout>
    
    </>
  );
};


export default Admin
