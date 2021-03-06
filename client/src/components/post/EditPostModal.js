import React from "react";
import PropTypes from "prop-types";

//MUI stuff
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  button: {
    padding: 0,
    margin: "20px 0"
  },
  editButton: {
    "&:hover, &:click": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff"
    }
  },
  cancelButton: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      color: "#fff"
    }
  }
});

const EditPostModal = ({
  openEditModal,
  handleModalEdit,
  handleSubmit,
  handleChange,
  content,
  classes
}) => {
  return (
    <Dialog
      open={openEditModal}
      onClose={handleModalEdit}
      fullScreen={window.innerWidth <= 500}
      aria-labelledby="Edit modal"
      fullWidth
      maxWidth="sm">
      <DialogTitle id="Edit" align="center">
        Edit / Update Post
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            multiline
            id="content"
            name="content"
            label="Edit post"
            type="text"
            onChange={handleChange}
            value={content}
            fullWidth
          />
          <DialogActions className={classes.button}>
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.editButton}
              fullWidth
              size="large">
              Update
            </Button>
            <Button
              variant="contained"
              onClick={handleModalEdit}
              fullWidth
              className={classes.cancelButton}
              size="large">
              CANCEL
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditPostModal.propTypes = {
  openEditModal: PropTypes.bool.isRequired,
  handleModalEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditPostModal);
