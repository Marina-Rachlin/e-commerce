import { useState, useEffect } from "react";
import AdminLayout from "../../../layout/admin/AdminLayout";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useGetAllUsersQuery } from "../../../redux/features/users/userApi";
import { getInitials } from "../../../utils/get-initials";
import CustomAvatar from "../../../components/avatar/CustomAvatar";
import format from "date-fns/format";
import NewMemberDialog from "./NewMemberDialog";
import CustomToolbar from "./CustomToolbar";

import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import {
  Box,
  Avatar as MuiAvatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

export default function RolesTable({ handleOpenDialog }) {

    // Fetching Data
  const { isLoading, data, error, refetch } = useGetAllUsersQuery("admin");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  const [rowCountState, setRowCountState] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


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
    } else {
      console.log(error);
      console.log("Error. trying to refetch...");
      refetch();
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
    </>
  );
}
