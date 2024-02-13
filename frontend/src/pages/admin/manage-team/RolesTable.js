import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useGetAllUsersQuery } from "../../../redux/features/users/userApi";
import { getInitials } from "../../../utils/get-initials";
import CustomAvatar from "../../../components/avatar/CustomAvatar";
import format from "date-fns/format";
import NewMemberDialog from "./NewMemberDialog";
import CustomToolbar from "./CustomToolbar";
import { useUpdateUserRoleMutation } from "../../../redux/features/users/userApi";
import { toast } from "react-hot-toast";

import { DataGrid} from "@mui/x-data-grid";
import {
  Box,
  Avatar as MuiAvatar,
  Typography,
} from "@mui/material";

// ** renders customer column (with avatar or initials)
const renderCustomer = (row) => {
  if (row.avatar) {
    return (
      <MuiAvatar
        src={row.avatar.url}
        sx={{
          mr: 3,
          width: "2.8rem",
          height: "2.8rem",
          borderRadius: "50%",
        }}
      />
    );
  } else {
    return (
      <CustomAvatar
        sx={{
          mr: 3,
          width: "2.8rem",
          height: "2.8rem",
          borderRadius: "50%",
          fontSize: ".875rem",
        }}
      >
        {getInitials(row.name)}
      </CustomAvatar>
    );
  }
};

const CustomChip = ({ value }) => {
  return (
    <div
      className="status-chip"
      style={{ backgroundColor: "#fff2de", color: "#ffb400" }}
    >
      {value}
    </div>
  );
};

//** columns
const columns = [
  {
    field: "name",
    headerName: "Customer",
    flex: 0.3,
    // minWidth: 200,
    renderCell: ({ row }) => {
      const { name, email } = row;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderCustomer(row)}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              style={{
                color: "#2b3445",
                fontWeight: "400",
                lineHeight: "1.75",
                textTransform: "capitalize",
              }}
            >
              <Link href="#" color="inherit">
                {" "}
                {name}{" "}
              </Link>
            </Typography>
            <Typography
              noWrap
              variant="caption"
              color={"#7D879C"}
              fontWeight={300}
            >
              {email}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.15,
    // minWidth: 80,
    renderCell: (params) => <CustomChip value={params.value} />,
  },
  {
    field: "created_at",
    headerName: "Created At",
    flex: 0.15,
    // minWidth: 150,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#7D879C", fontWeight: "300" }}
        >
          {row.created_at}
        </Typography>
      );
    },
  },
];

export default function RolesTable() {

  // Fetching Data
  const { isLoading, data, error, refetch } = useGetAllUsersQuery("admin");
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [rowCountState, setRowCountState] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  //Updating role
  const [role, setRole] = useState('');
  const [email, setEmail]  = useState('');
  
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
        await updateUserRole({ email, role });
        toast.success("Role updated successfully!", { duration: 2000 });
        refetch(); 
        handleCloseDialog(); 
        setRole(''); 
        setEmail(''); 
      } catch (error) {
        toast.error(error.message || "Failed to update role", { duration: 2000 });
      }
  };

  const [updateUserRole] = useUpdateUserRoleMutation();

  //toggle dialog
   const [openDialog, setOpenDialog] = useState(false);

   const handleOpenDialog = () => setOpenDialog(true);
   const handleCloseDialog = () => setOpenDialog(false);



// UseEffect
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data) {
      const newRows = data.users.map((item) => ({
        id: item._id, // used as a key
        name: item.name,
        email: item.email,
        avatar: item.avatar,
        totalSpent: item.totalSpent,
        created_at: format(new Date(item.updatedAt), "dd MMM yyyy"),
        role: item.role,
      }));
      setRows(newRows);
      setRowCountState(newRows.length);
      setLoading(false);
    }else {
      console.log(error);
      setLoading(false);
    }
  }, [isLoading, data, error, paginationModel, rowCountState, loading]);

  return (
    <>
      <Box className="data-grid-container">
        <DataGrid
          checkboxSelection
          autoHeight
          rows={rows}
          columns={columns}
          loading={loading}
          className="default-table manage-job-table"
          disableRowSelectionOnClick
          rowCount={rowCountState}
          pageSizeOptions={[25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              onAddNewMember: handleOpenDialog,
            },
          }}
        />
      </Box>

      <NewMemberDialog open={openDialog} onClose={handleCloseDialog} onEmailChange={handleEmailChange} onRoleChange={handleRoleChange} role={role} email={email} onSubmit={handleSubmit}/>
    </>
  );
}
