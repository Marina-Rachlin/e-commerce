
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {useGetAllUsersQuery} from "../../redux/features/users/userApi";
import {getInitials} from '../../utils/get-initials';
import CustomAvatar from "../../components/avatar/CustomAvatar";
import format from 'date-fns/format';

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
    field: "country",
    headerName: "Country",
    flex: 0.3,
    // minWidth: 80,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#7D879C", fontWeight: "300" }}
        >
          {row.country}
        </Typography>
      );
    },
  },
{
  field: "totalSpent",
  headerName: "Total Spent",
  flex: 0.15,
  // minWidth: 70,
  renderCell: ({ row }) => {
    return (
      <Typography
        noWrap
        variant="body1"
        style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
      >
        ${row.totalSpent}
      </Typography>
    );
  },
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
      </Box>
    </Box>
  );
};

const UsersTable = () => {
 
  // ** State
  const [value, setValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [rowCountState, setRowCountState] = useState(0);
  const { isLoading, data, error, refetch } = useGetAllUsersQuery();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback(val => {
    setValue(val)
  }, []);

  useEffect(() => {
    
    if (isLoading) {
      return;
    }

    if (data) {
      console.log(data.users)
      const newRows = data.users.map((item) => ({
        id: item._id, // used as a key
        name: item.name,
        email: item.email,
        orders: item.orders,
        avatar: item.avatar,
        totalSpent: item.totalSpent,
        created_at: format(new Date(item.updatedAt), 'dd MMM yyyy'),
        country: item.addresses[0].country
      }));
      setRows(newRows);
      setRowCountState(newRows.length);
      setLoading(false)
    } else {
      console.log(error);
      setLoading(false)
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
      // paginationMode="server"
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

