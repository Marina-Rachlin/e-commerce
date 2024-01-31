import MenuToggler from "../../../components/admin/MenuToggler";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import AdminLayout from "../../../layout/admin/AdminLayout";
import ProductsTable from "./ProductsTable";
import TopCardBlock from "./TopCardBlock";


const Products = () => {
  return (
    <AdminLayout breadcrumbTitle="Product List">
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Product List" />
          {/* breadCrumb */}

          <MenuToggler />
          {/*Collapsible sidebar button */}

          <div className="row" style={{ margin: "0 -24px" }}>
            {/* <TopCardBlock /> */}
          </div>
          {/* <!-- End TopCardBlock --> */}

          <ProductsTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
