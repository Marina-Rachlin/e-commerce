import PostBoxForm from "../../../components/admin/createProduct/components/PostBoxForm";
import MenuToggler from "../../../components/admin/MenuToggler";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";
import Script from "next/script";

const createProduct = () => {
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
     
      {/* <!-- Dashboard --> */}
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Add New Product"  subtitle="Products placed across your store"/>
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                  </div>

                  <div className="widget-content">

                    <PostBoxForm />
                    {/* End post box form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </div>
    

    </AdminLayout>
    </>

  );
};

export default createProduct;
