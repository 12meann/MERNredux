import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import CircularProgress from "@material-ui/core/CircularProgress";

import DialogActions from "@material-ui/core/DialogActions";

export class DeleteDialog extends Component {
  state = {
    openModal: false
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.state.openModal}
          onClose={this.props.handleModalDelete}
          aria-labelledby="Delete modal"
          // className={classes.dialog}
        >
          <DialogTitle
            // className={classes.title}
            id="Login"
            align="center">
            Delete Account
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is irreversable.
              <br />
              <br />
              Are you sure you want to delete your account?
              <br />
              <br />
              All your profile info will be deleted.
              <br />
              (Post and comments might still be available.)
            </DialogContentText>
            <DialogActions>
              <Button
                variant="contained"
                onClick={this.props.handleDelete}
                // className={classes.deleteButton}
                fullWidth
                // disabled={loading}
                size="large">
                DELETE
                {/* {loading && (
                  <CircularProgress size={30} className={classes.spinner} />
                )} */}
              </Button>
              <Button
                variant="contained"
                onClose={this.props.handleModalDelete}
                fullWidth
                color="secondary"
                size="large">
                CANCEL
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
