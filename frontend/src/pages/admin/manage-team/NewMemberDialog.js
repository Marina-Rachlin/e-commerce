import { useState, useCallback } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ==============================|| DIALOG - FORM ||============================== //

export default function NewMemberDialog({ open, onClose} ) {

  const [role, setRole] = useState("");
  const [email, setEmail] = useState('');

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle variant='h5'>Edit Role</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Edit roles as per your requirements.
            </DialogContentText>
            <Alert severity="warning" sx={{ mb: 4 }}>
              <AlertTitle>Warning!</AlertTitle>
              Granting or changing a user's role impacts their access level and
              permissions within the system. Assigning a user to an admin role
              or vice versa will significantly alter their capabilities and the
              data they can access or modify. Proceed with caution and ensure
              you fully understand the implications of these changes to maintain
              the integrity and security of the system.
            </Alert>
            <TextField
              id="name"
              placeholder="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
              <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onClose}>
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
