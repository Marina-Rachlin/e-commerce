"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useGetAllProductsQuery } from "../../../redux/features/products/productApi";
import { format } from "timeago.js";
import { useDeleteProductMutation } from "../../../redux/features/products/productApi";
import {toast} from 'react-hot-toast';

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
const productCategory = {
  Makeup: { icon: "mdi:lipstick", color: "#D92F25"},
  Skincare: { icon: "mdi:face-man-shimmer-outline", color: "#56c900" },
  Hair: { icon: "mdi:hair-dryer-outline", color: "#f9aa00" },
  Body: { icon: "mdi:shower-head", color: "#15b0fe" },
  Accessories: { icon: "mdi:brush", color: "#9262e6 " },
  Kids: { icon: "mdi:account-outline", color: "rgb(255, 205, 78)" }
};

// ** renders product image
const renderProduct = (row) => {
  if (row.images.length > 0) {
    return (
      <MuiAvatar
        src={row.images[0].url}
        sx={{
          mr: 3,
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "0.25rem",
        }}
      />
    );
  }
};

// ** rowOptions(3 dots) column
const RowOptions = ({ id, deleteProduct, isSuccess, refetch }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      refetch();
      handleRowOptionsClose();
    } catch (error) {
      console.log(error);
    }
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
          href={`/admin/products/overview/${id}`}
        >
          <Icon icon="mdi:eye-outline" fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ "& svg": { mr: 2 }, "&:hover": { color: "unset" } }}
          onClick={handleRowOptionsClose}
          href={`/admin/products/overview/${id}`}
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

// //** columns
// const columns = [
//   {
//     field: "name",
//     headerName: "Product",
//     flex: 0.5,
//     minWidth: 200,
//     renderCell: ({ row }) => {
//       const { name, brand } = row;
//       return (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {renderProduct(row)}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               flexDirection: "column",
//             }}
//           >
//             <Typography
//               variant="body1"
//               style={{
//                 color: "#2b3445",
//                 fontWeight: "400",
//                 lineHeight: "1.75",
//                 textTransform: "capitalize",
//               }}
//             >
//               <Link href="#" color="inherit">
//                 {" "}
//                 {name}{" "}
//               </Link>
//             </Typography>
//             <Typography
//               noWrap
//               variant="caption"
//               color={"#7D879C"}
//               fontWeight={300}
//             >
//               {brand}
//             </Typography>
//           </Box>
//         </Box>
//       );
//     },
//   },
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
//   {
//     field: "stock",
//     headerName: "Stock",
//     flex: 0.2,
//     minWidth: 100,
//     renderCell: ({ row }) => {
//       const cellStyles =
//         row.stock > 0
//           ? { color: "#2b3445" }
//           : { color: "#d92f25", fontSize: "14px" };

//       return (
//         <Typography noWrap variant="body1" style={cellStyles}>
//           {row.stock > 0 ? row.stock : "Out of Stock"}
//         </Typography>
//       );
//     },
//   },
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
//   {
//     flex: 0.1,
//     sortable: false,
//     field: "actions",
//     headerName: "Actions",
//     renderCell: ({ row }) => <RowOptions id={row.id} />,
//   },
// ];

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
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

const ProductsTable = () => {
  // ** State
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25});
  const { page, pageSize } = paginationModel;
  const [rowCountState, setRowCountState] = useState(0);
  const { isLoading, data, error, refetch} = useGetAllProductsQuery({
    brand,
    category,
    stock: status,
    value,
    page,
    pageSize,
    context: 'admin'
  },{ refetchOnMountOrArgChange: true });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  
  const [deleteProduct, { isSuccess, error: deleteError }] = useDeleteProductMutation({});

  //** columns
const columns = [
  {
    field: "name",
    headerName: "Product",
    flex: 0.5,
    minWidth: 200,
    renderCell: ({ row }) => {
      const { name, brand } = row;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderProduct(row)}
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
              {brand}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    flex: 0.3,
    minWidth: 150,
    renderCell: ({ row }) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& svg": { mr: 1, color: productCategory[row.category].color },
          }}
        >
          <Icon
            icon={productCategory[row.category].icon}
            style={{ fontSize: "20px" }}
          />
          <Typography
            noWrap
            variant="body1"
            style={{
              color: "#2b3445",
              fontWeight: "400",
              lineHeight: "1.75",
              textTransform: "capitalize",
            }}
          >
            {row.category}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 0.2,
    minWidth: 100,
    renderCell: ({ row }) => {
      const cellStyles =
        row.stock > 0
          ? { color: "#2b3445" }
          : { color: "#d92f25", fontSize: "14px" };

      return (
        <Typography noWrap variant="body1" style={cellStyles}>
          {row.stock > 0 ? row.stock : "Out of Stock"}
        </Typography>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    flex: 0.2,
    minWidth: 70,
    renderCell: ({ row }) => {
      return (
        <Typography
          noWrap
          variant="body1"
          style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
        >
          ${row.price}
        </Typography>
      );
    },
  },
  {
    field: "discountPrice",
    headerName: "Discount",
    flex: 0.15,
    renderCell: ({ row }) => {
      if (row.discountPrice) {
        return (
          <Typography
            noWrap
            variant="body1"
            style={{ color: "#2b3445", fontWeight: "400", lineHeight: "1.75" }}
          >
            ${row.discountPrice}
          </Typography>
        );
      }
      return null;
    },
  },
  {
    flex: 0.1,
    sortable: false,
    field: "actions",
    headerName: "Actions",
    renderCell: ({ row }) => <RowOptions id={row.id} deleteProduct={deleteProduct} isSuccess={isSuccess} refetch={refetch}/>,
  },
];

  const handleFilter = useCallback(val => {
    setValue(val)
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const handleBrandChange = useCallback((e) => {
    setBrand(e.target.value);
  }, []);

  const handleStatusChange = useCallback((e) => {
    if (e.target.value !== "") {
      if (e.target.value === "0") {
        setStatus(0);
      } else {
        setStatus(">0");
      }
    } else {
      setStatus("");
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      return; 
    }

    if (data) {
      const newRows = data.products.map((item) => ({
        id: item._id, 
        name: item.name,
        category: item.category,
        brand: item.brand,
        stock: item.stock,
        price: item.price,
        discountPrice: item.discountPrice,
        images: item.images,
        created_at: format(item.createdAt),
      }));
      setRows(newRows);
      setRowCountState((prevRowCountState) =>
        data?.totalPages !== undefined ? data?.totalProducts : prevRowCountState
      );
      setLoading(false)
    } else {
      console.log(error);
      console.log(deleteError);
      refetch()
    }
  }, [ 
    isLoading,
    data, 
    brand,
    category,
    status,
    value,
    paginationModel,
    error,
    isSuccess
  ]);

  // const handleDelete = async () => {
  //   const id = productId;
  //   await deleteProduct(id);
  // };


  return (
    <div className="data-grid">
      <CardHeader title="Search Filters" className="mui-card-header" />

      <CardContent>
        <Grid container spacing={6}>
          <Grid item sm={4} xs={12}>
            <FormControl fullWidth className="data-grid-select-style">
              <InputLabel id="category-select">Select Category</InputLabel>
              <Select
                fullWidth
                value={category}
                id="select-category"
                label="Select Category"
                labelId="category-select"
                onChange={handleCategoryChange}
                inputProps={{ placeholder: "Select Category" }}
              >
                <MenuItem value="">Select Category</MenuItem>
                <MenuItem value="Body">Body</MenuItem>
                <MenuItem value="Hair">Hair</MenuItem>
                <MenuItem value="Skincare">Skincare</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
                <MenuItem value="Makeup">Makeup</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormControl fullWidth className="data-grid-select-style">
              <InputLabel id="brand-select">Select Brand</InputLabel>
              <Select
                fullWidth
                value={brand}
                id="select-brand"
                label="Select Brand"
                labelId="brand-select"
                onChange={handleBrandChange}
                inputProps={{ placeholder: "Select Brand" }}
              >
                <MenuItem value="">Select Brand</MenuItem>
                <MenuItem value="Cosrx">Cosrx</MenuItem>
                <MenuItem value="Manyo Factory">Manyo Factory</MenuItem>
                <MenuItem value="Chanel">Chanel</MenuItem>
                <MenuItem value="Loreal">Loreal</MenuItem>
                <MenuItem value="YOUTHFORIA">YOUTHFORIA</MenuItem>
                <MenuItem value="Mediheal">Mediheal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={12}>
            <FormControl fullWidth className="data-grid-select-style">
              <InputLabel id="status-select">Select Status</InputLabel>
              <Select
                fullWidth
                value={status}
                id="select-status"
                label="Select Status"
                labelId="status-select"
                onChange={handleStatusChange}
                inputProps={{ placeholder: "Select Status" }}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value=">0">In Stock</MenuItem>
                <MenuItem value="0">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>

      <Divider className="mui-divider" />
      <Box className="data-grid-container">
        <DataGrid
          checkboxSelection
          autoHeight
          rows={rows}
          columns={columns}
          loading={loading}
          className="default-table manage-job-table"
          disableRowSelectionOnClick
          filterMode="server"
          paginationMode="server"
          rowCount={rowCountState}
          pageSizeOptions={[25, 50, 100]}
          paginationModel={paginationModel}
          // onPaginationModelChange={setPaginationModel}
          // onFilterModelChange={setFilterModel}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              value: value,
              clearSearch: () => handleFilter(''),
              onChange: event => handleFilter(event.target.value)
            }
          }}
        />
      </Box>
    </div>
  );
};

export default ProductsTable;
