"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useGetAllOrdersQuery } from "../../../redux/features/orders/orderApi";
import format from 'date-fns/format';

import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";

// ** Vars

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

const StatusChip = ({ value }) => {
  const getStatusStyles = () => {
    switch (value) {
      case 'Processing':
        return {
          backgroundColor: 'rgb(255, 248, 229)',
          color: 'rgb(255, 205, 78)',
        };
      case 'Delivered':
        return {
          backgroundColor: 'rgb(231, 249, 237)',
          color: 'rgb(51, 208, 103)',
        };
      case 'Cancelled':
        return {
          backgroundColor: 'rgb(255, 234, 234)',
          color: 'rgb(233, 69, 96)',
        };
      case 'Pending':
        return {
          backgroundColor: 'rgb(219, 240, 254)',
          color: 'rgb(78, 151, 253)',
        };
      default:
        return {
          backgroundColor: 'rgb(255, 248, 229)',
          color: 'rgb(255, 205, 78)',
        };
    }
  };

  const statusStyles = getStatusStyles();

  return (
    <div className="status-chip" style={statusStyles}>
      {value}
    </div>
  );
};


//** columns
const columns = [
  {
    field: "id",
    headerName: "Id",
    flex: 0.15,
    // minWidth: 70,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
        >
          #{row.id}
        </Typography>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 0.1,
    // minWidth: 70,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
        >
          {row.quantity}
        </Typography>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Purchase Date",
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
    field: "billingAddress",
    headerName: "Billing Address",
    flex: 0.2,
    // minWidth: 80,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#7D879C", fontWeight: "300" }}
        >
          {row.billingAddress}
        </Typography>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.1,
    // minWidth: 70,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
        >
          ${row.amount}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.15,
    // minWidth: 80,
    renderCell: (params) => <StatusChip value={params.value} />,
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
const CustomToolbar = (props) => {
  return (
    <Box className="grid-toolbar">
      <GridToolbarExport className="grid-toolbar-export" />
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search ..."
          sx={{ mr: 4, mb: 2 }}
          className="mui-search-field"
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: "flex" }}>
                <Icon icon="mdi:magnify" fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton
                size="small"
                title="Clear"
                aria-label="Clear"
                onClick={props.clearSearch}
              >
                <Icon icon="mdi:close" fontSize={20} />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

const OrdersTable = () => {
  // ** State
  const [value, setValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });
  // const { page, pageSize } = paginationModel;
  const [rowCountState, setRowCountState] = useState(0);
  const { isLoading, data, error, refetch } = useGetAllOrdersQuery({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = useCallback((val) => {
    setValue(val);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data) {
      console.log(data)
      const newRows = data.orders.map((item) => ({
        id: item._id.slice(-10),
        quantity: item.cart.reduce(
          (total, cartItem) => total + cartItem.quantity,
          0
        ),
        amount: item.totalPrice,
        status: item.status,
        billingAddress: `${item.shippingAddress.country}, ${item.shippingAddress.address}`,
        created_at: format(new Date(item.updatedAt), 'dd MMM yyyy'),
      }));
      setRows(newRows);
      setRowCountState(newRows.length);
      setLoading(false);
    } else {
      console.log(error);
      refetch()
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
            clearSearch: () => handleSearch(""),
            onChange: (event) => handleSearch(event.target.value),
          },
        }}
      />
    </Box>
  );
};

export default OrdersTable;
