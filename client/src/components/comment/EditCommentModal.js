import React, { Component } from "react";
import { connect } from "react-redux";
import { editComment } from "../../store/actions/commentsAction";
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
    "&:hover": {
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

class EditCommentModal extends Component {
  render() {
    const {
      openEditModal,
      handleModalEdit,
      handleSubmit,
      handleChange,
      content,
      classes
    } = this.props;
    return (
      <Dialog
        open={openEditModal}
        onClose={handleModalEdit}
        aria-labelledby="Edit modal"
        fullScreen={window.innerWidth <= 500}
        className={classes.dialog}
        fullWidth
        maxWidth="sm">
        <DialogTitle id="Edit" align="center">
          Edit / Update Comment
        </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="content"
              name="content"
              label="Edit post"
              type="text"
              multiline
              onChange={handleChange}
              value={content}
              fullWidth
            />
            <DialogActions className={classes.button}>
              <Button
                variant="outlined"
                type="submit"
                className={classes.editButton}
                fullWidth
                size="large">
                Update
              </Button>
              <Button
                variant="contained"
                onClick={handleModalEdit}
                className={classes.cancelButton}
                fullWidth
                color="secondary"
                size="large">
                CANCEL
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

EditCommentModal.propTypes = {
  editComment: PropTypes.func.isRequired,
  openEditModal: PropTypes.bool.isRequired,
  handleModalEdit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { editComment }
)(withStyles(styles)(EditCommentModal));
