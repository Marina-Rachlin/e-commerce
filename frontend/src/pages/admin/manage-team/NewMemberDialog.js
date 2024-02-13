import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";


export default function NewMemberDialog({ open, onClose, email, role, onEmailChange, onRoleChange, onSubmit }) {

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{p: 1, py: 1.5}}>
          <DialogTitle variant="h5"  style={{ textAlign: "center" }}  sx={{ mt: 2}}>
            <Typography variant="h5" component="span" sx={{ mb: 2 }}>
              Edit Roles
            </Typography>
            <Typography variant="body1" >
              Edit roles as per your requirements.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 4 }}>
              <AlertTitle>Warning!</AlertTitle>
              Changing a user's role affects their system access and
              permissions. Proceed with caution and ensure you fully understand
              the implications of these changes to maintain the integrity and
              security of the system.
            </Alert>
            <TextField
              id="name"
              placeholder="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={onEmailChange}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={onRoleChange}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"user"}>User</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{mb: 3}}>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onSubmit}>
              Update
            </Button>
          </DialogActions>
          </Box>
      </Dialog>
    </>
  );
}
