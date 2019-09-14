import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/AddPhotoAlternateRounded";
import Tooltip from "@material-ui/core/Tooltip";

const styles = () => ({
  imgIcon: {
    position: "relative",
    top: "-35px",
    right: "-120px"
  }
});

const EditImage = ({ classes, handleEditImage, handleClickEdit }) => {
  return (
    <Fragment>
      <Tooltip title="edit image" placement="top-end">
        <IconButton
          aria-label="add image"
          className={classes.imgIcon}
          onClick={handleClickEdit}>
          <ImageIcon color="primary" fontSize="large" />
        </IconButton>
      </Tooltip>

      <input
        type="file"
        id="imageInput"
        name="image"
        hidden="hidden"
        onChange={handleEditImage}
      />
    </Fragment>
  );
};
EditImage.propTypes = {
  classes: PropTypes.object.isRequired,
  handleEditImage: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired
};

export default withStyles(styles)(EditImage);
