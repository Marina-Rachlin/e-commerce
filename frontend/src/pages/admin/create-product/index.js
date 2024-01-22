import PostBoxForm from "../../../components/admin/createProduct/components/PostBoxForm";
import MenuToggler from "../../../components/admin/MenuToggler";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";

const createProduct = () => {
  return (
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
                    {/* <h4>Post Job</h4> */}
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
        {/* End dashboard-outer */}
      </div>
      {/* <!-- End Dashboard --> */}

    </AdminLayout>

  );
};

export default createProduct;
