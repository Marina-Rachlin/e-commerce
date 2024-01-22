"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {useGetAllUsersQuery} from "../../redux/features/users/userApi";
import { format } from "timeago.js";
import {getInitials} from '../../utils/get-initials';
import CustomAvatar from "../../components/avatar/CustomAvatar";

import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import {
  Box,
  CardContent,
  Avatar as MuiAvatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Divider,
  CardHeader,
} from "@mui/material";


// ** Vars

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
  }
  else {
    return (
      <CustomAvatar
        sx={{ mr: 3,  width: "2.8rem", height: "2.8rem", borderRadius: "50%", fontSize: '.875rem' }}
      >
        {getInitials(row.name)}
      </CustomAvatar>
    )
  }
};

// ** rowOptions(3 dots) column
const RowOptions = ({ id }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // dispatch(deleteStudent(id))
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="mdi:dots-vertical" style={{ fontSize: "20px" }} />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem
          component={Link}
          sx={{ "& svg": { mr: 2 }, "&:hover": { color: "unset" } }}
          onClick={handleRowOptionsClose}
          href={`/admin/users/overview/${id}`}
        >
          <Icon icon="mdi:eye-outline" fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ "& svg": { mr: 2 }, "&:hover": { color: "unset" } }}
          onClick={handleRowOptionsClose}
          href={`/admin/users/overview/${id}`}
        >
          <Icon icon="mdi:pencil-outline" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="mdi:delete-outline" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

//** columns
const columns = [
  {
    field: "name",
    headerName: "Customer",
    flex: 0.5,
    minWidth: 200,
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
//   {
//     field: "category",
//     headerName: "Category",
//     flex: 0.3,
//     minWidth: 150,
//     renderCell: ({ row }) => {
//       return (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             "& svg": { mr: 1, color: productCategory[row.category].color },
//           }}
//         >
//           <Icon
//             icon={productCategory[row.category].icon}
//             style={{ fontSize: "20px" }}
//           />
//           <Typography
//             noWrap
//             variant="body1"
//             style={{
//               color: "#2b3445",
//               fontWeight: "400",
//               lineHeight: "1.75",
//               textTransform: "capitalize",
//             }}
//           >
//             {row.category}
//           </Typography>
//         </Box>
//       );
//     },
//   },
  // {
  //   field: "orders",
  //   headerName: "Orders",
  //   flex: 0.2,
  //   minWidth: 100,
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap variant="body1">
  //         {row.orders.length > 0 ? row.orders.length : ""}
  //       </Typography>
  //     );
  //   },
  // },
//   {
//     field: "price",
//     headerName: "Price",
//     flex: 0.2,
//     minWidth: 70,
//     renderCell: ({ row }) => {
//       return (
//         <Typography
//           noWrap
//           variant="body1"
//           style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
//         >
//           ${row.price}
//         </Typography>
//       );
//     },
//   },
//   {
//     field: "discountPrice",
//     headerName: "Discount",
//     flex: 0.15,
//     renderCell: ({ row }) => {
//       if (row.discountPrice) {
//         return (
//           <Typography
//             noWrap
//             variant="body1"
//             style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
//           >
//             ${row.discountPrice}
//           </Typography>
//         );
//       }
//       return null;
//     },
//   },
  {
    field: "created_at",
    headerName: "Created At",
    flex: 0.15,
    minWidth: 150,
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
//   { field: " ", headerName: "Purchased", flex: 0.15, minWidth: 80 },
  {
    flex: 0.1,
    sortable: false,
    field: "actions",
    headerName: "Actions",
    renderCell: ({ row }) => <RowOptions id={row.id} />,
  },
];

//** Grid custom toolbar
const CustomToolbar = props => {
  return (
    <Box className="grid-toolbar">
      <GridToolbarExport className="grid-toolbar-export" />
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small" 
          value={props.value}
          onChange={props.onChange}
          placeholder='Search ...'
          sx={{ mr: 4, mb: 2 }}
          className="mui-search-field"
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='mdi:magnify' fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            )
          }} 
        />
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          className="mui-toggle-button"
        >
          Add Customer
        </Button>
      </Box>
    </Box>
  );
};

const UsersTable = () => {
  // ** State
  const [value, setValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const { page, pageSize } = paginationModel;
  const [rowCountState, setRowCountState] = useState(0);
  const { isLoading, data, error, refetch } = useGetAllUsersQuery({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback(val => {
    setValue(val)
  }, []);

  useEffect(() => {
    
    if (isLoading) {
      console.log('isLoading....')
      return; // Skip the rest of the code if still loading
    }

    if (data) {
      console.log('data received!')
      console.log(data)
      const newRows = data.users.map((item) => ({
        id: item._id, // used as a key
        name: item.name,
        email: item.email,
        orders: item.orders,
        avatar: item.avatar,
        created_at: format(item.createdAt),
      }));
      setRows(newRows);
      // setRowCountState((prevRowCountState) =>
      //   data?.totalPages !== undefined ? data?.totalProducts : prevRowCountState
      // );
      setLoading(false)
    } else {
      console.log(error);
      console.log('Error. trying to refetch...')
      // refetch()
    }
  }, [isLoading, data, error, paginationModel, value]);

  return (
    <Box className="data-grid-container">
    <DataGrid
      checkboxSelection
      autoHeight
      rows={rows}
      columns={columns}
      loading={loading}
      className="default-table manage-job-table"
      disableRowSelectionOnClick
      paginationMode="server"
      rowCount={rowCountState}
      pageSizeOptions={[25, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      slots={{ toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          value: value,
          clearSearch: () => handleSearch(''),
          onChange: event => handleSearch(event.target.value)
        }
      }}
    />
  </Box> 
  );
};

export default UsersTable;

