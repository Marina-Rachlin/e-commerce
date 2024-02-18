import MenuToggler from "../../../components/admin/MenuToggler";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";
import UsersTable from "../../../views/customers/UsersTable";
import Script from "next/script";
import Head from "next/head";

const index = () => {
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
     
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Customers" />

          <MenuToggler />

          <div className="row" style={{margin: '0 -24px'}}>
           <UsersTable />
          </div>

        </div>
      </div>

    </AdminLayout></>


  );
};

export default index;


