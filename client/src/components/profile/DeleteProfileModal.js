import React from "react";

//MUI
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
  deleteButton: {
    borderColor: theme.palette.error.dark,
    color: "#000",
    "&:hover": {
      backgroundColor: theme.palette.error.main
    }
  },
  dialog: {
    padding: "20px",
    textAlign: "center"
  }
});

const DeleteProfileModal = ({
  openDeleteModal,
  handleModalDelete,
  handleDelete,
  classes
}) => {
  return (
    <Dialog
      open={openDeleteModal}
      onClose={handleModalDelete}
      aria-labelledby="Delete modal"
      className={classes.dialog}
      fullWidth
      maxWidth="sm">
      <DialogTitle id="Login" align="center">
        Delete Account
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="h6">
          This is irreversable.
          <br />
          <br />
          Are you sure you want to delete your account?
          <br />
          <br />
          All your profile info will be deleted.
        </DialogContentText>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleDelete}
            className={classes.deleteButton}
            fullWidth
            size="large">
            DELETE
          </Button>
          <Button
            variant="contained"
            onClick={handleModalDelete}
            fullWidth
            color="secondary"
            size="large">
            CANCEL
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(DeleteProfileModal);
