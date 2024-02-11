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

  import { DataGrid, GridToolbarExport } from "@mui/x-data-grid";
  import { Icon } from "@iconify/react";
  
  
  const CustomToolbar = ({ onAddNewMember}) => {
    return (
      <Box className="grid-toolbar">
        <GridToolbarExport className="grid-toolbar-export" />
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
            <Button
            onClick={onAddNewMember}
          sx={{ mb: 2 }}
          variant="contained"
          className="mui-toggle-button"
        >
          Add New Member
        </Button>
        </Box>
      </Box>
    );
  };

  export default CustomToolbar