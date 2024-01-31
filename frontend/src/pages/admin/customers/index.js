import MenuToggler from "../../../components/admin/MenuToggler";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";
import UsersTable from "../../../views/customers/UsersTable";

const index = () => {
  return (
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

    </AdminLayout>

  );
};

export default index;


