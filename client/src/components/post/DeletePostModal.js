import React from "react";
import PropTypes from "prop-types";

//MUI stuff
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
      backgroundColor: theme.palette.error.main,
      color: "#fff"
    }
  },
  dialog: {
    padding: "20px",
    textAlign: "center"
  }
});

const DeletePostModal = ({
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
      fullScreen={window.innerWidth <= 500}
      fullWidth
      maxWidth="sm">
      <DialogTitle id="Login" align="center">
        Delete Post ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="h6">
          This is irreversable.
          <br />
          <br />
          Are you sure you want to delete this post?
          <br />
          <br />
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
            color="primary"
            size="large">
            CANCEL
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

DeletePostModal.propTypes = {
  openDeleteModal: PropTypes.bool.isRequired,
  handleModalDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeletePostModal);
