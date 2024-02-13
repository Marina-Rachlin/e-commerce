import {Box, Button } from "@mui/material";
import {GridToolbarExport } from "@mui/x-data-grid";
  
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
          Edit Role
        </Button>
        </Box>
      </Box>
    );
  };

  export default CustomToolbar