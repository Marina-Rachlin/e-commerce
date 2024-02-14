import { useEffect } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function NewMemberDialog({
  open,
  onClose,
  email,
  role,
  onEmailChange,
  onRoleChange,
  onSubmit,
}) {
  const defaultValues = {
    email: "",
    role: "",
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  useEffect(() => {
    setValue("role", role);
  }, [role, setValue]);

  const handleFormSubmit = (e) => {
    onSubmit();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box sx={{ p: 1, py: 1.5 }}>
            <DialogTitle
              variant="h5"
              style={{ textAlign: "center" }}
              sx={{ mt: 2 }}
            >
              <Typography variant="h5" component="span" sx={{ mb: 2 }}>
                Edit Roles
              </Typography>
              <Typography variant="body1">
                Edit roles as per your requirements.
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Alert severity="warning" sx={{ mb: 4 }}>
                <AlertTitle>Warning!</AlertTitle>
                Changing a user's role affects their system access and
                permissions. Proceed with caution and ensure you fully
                understand the implications of these changes to maintain the
                integrity and security of the system.
              </Alert>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={onEmailChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      {...field}
                      labelId="role-select-label"
                      id="role-select"
                      label="Role"
                      value={role}
                      onChange={onRoleChange}
                      error={Boolean(errors.role)}
                    >
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"user"}>User</MenuItem>
                    </Select>
                    <Typography variant="caption" color="error">
                      {errors.role?.message}
                    </Typography>
                  </FormControl>
                )}
              />
            </DialogContent>
            <DialogActions sx={{ mb: 3 }}>
              <Button color="error" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
