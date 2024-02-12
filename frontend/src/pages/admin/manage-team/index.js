import React, {useState} from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import BreadCrumb from "../../../components/admin/BreadCrumb";
import MenuToggler from "../../../components/admin/MenuToggler";
import RolesTable from "./RolesTable";
import NewMemberDialog from "./NewMemberDialog";

const index = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);


  return (
    <AdminLayout>
      <div className="admin-section user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Manage Team" />
          <div className="row">
            <RolesTable  handleOpenDialog={handleOpenDialog}/>
            <NewMemberDialog open={openDialog} onClose={handleCloseDialog} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default index;
