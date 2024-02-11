import { useState } from 'react';

// material-ui
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

// ==============================|| DIALOG - FORM ||============================== //

export default function NewMemberDialog({open, onClose}) {

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box sx={{ p: 1, py: 1.5 }}>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              To subscribe to this website, please enter your email address here. We will send updates occasionally.
            </DialogContentText>
            <TextField id="name" placeholder="Email Address" type="email" fullWidth variant="outlined" />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onClose}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
