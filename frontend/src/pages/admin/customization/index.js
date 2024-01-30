import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";
import MainBannerEditor from "./MainBannerEditor";
import PreviewWindow from "./PreviewWindow";

const index = () => {
  return (
    <AdminLayout>
      {/* <!-- Dashboard --> */}
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb
            title="Edit Banner"
            subtitle="Products placed across your store"
          />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Banner 1</h4>
                  </div>
                  <div className="widget-content">
                    <MainBannerEditor />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default index;
