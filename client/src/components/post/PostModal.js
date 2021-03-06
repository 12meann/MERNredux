import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import clsx from "clsx";

import MorePostButton from "./MorePostButton";
import Comments from "../comment/Comments";
import LikePost from "./LikePost";

//MUI stuff
import { withStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import DialogContent from "@material-ui/core/DialogContent";
import AddCommentIcon from "@material-ui/icons/AddComment";

const styles = theme => ({
  card: {
    margin: 0,
    padding: "40px 20px"
  },
  dialog: {
    padding: 0
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  commentTitle: {
    margin: "0 10px",
    right: "-10px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.main
    }
  },
  badge: {
    right: "-8px"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10
  }
});

export class PostModal extends Component {
  state = {
    expanded: false
  };
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const {
      handleClosePostModal,
      openPostModal,
      classes,
      post,
      user
    } = this.props;
    const { expanded } = this.state;

    return (
      <Dialog
        open={openPostModal}
        onClose={handleClosePostModal}
        aria-labelledby="Post Modal"
        fullScreen={window.innerWidth <= 500}
        fullWidth
        maxWidth="md">
        <Tooltip title="close">
          <IconButton
            aria-label="Close"
            className={classes.closeIcon}
            onClick={handleClosePostModal}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogContent className={classes.dialog}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              avatar={
                <Avatar
                  aria-label="User Image"
                  src={post.postedBy.image}
                  className={classes.avatar}
                  alt="profile image"
                />
              }
              action={
                user
                  ? post.postedBy
                    ? post.postedBy._id === user._id && (
                        <MorePostButton post={post} />
                      )
                    : null
                  : null
              }
              title={
                <MuiLink
                  underline="none"
                  component={Link}
                  to={`/users/${post.postedBy._id}`}>
                  <Typography
                    variant="h6"
                    color="primary"
                    className={classes.link}>
                    @{post.postedBy.username}
                  </Typography>
                </MuiLink>
              }
              subheader={moment(post.date.toString()).fromNow()}
            />
            <CardContent onClick={this.handlePostModal}>
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                className={classes.post}>
                {post.content}
              </Typography>
            </CardContent>

            {/* =================== */}
            <CardActions className={classes.comments}>
              {post.comments.length > 0 ? (
                <Badge
                  className={classes.badge}
                  badgeContent={post.comments.length}
                  color="primary">
                  <Typography
                    variant="body2"
                    onClick={this.handleExpandClick}
                    className={classes.commentTitle}>
                    Comments
                  </Typography>
                </Badge>
              ) : (
                <Fragment>
                  <AddCommentIcon color="primary" />
                  <Typography
                    variant="body2"
                    className={classes.commentTitle}
                    onClick={this.handleExpandClick}>
                    Add Comment
                  </Typography>
                </Fragment>
              )}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </IconButton>
              <LikePost postId={post._id} post={post} />
            </CardActions>

            {/* --------------- */}
          </Card>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Comments postId={post._id} />
          </Collapse>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  commentCount: state.comment.commentCount,
  user: state.auth.user
});
PostModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClosePostModal: PropTypes.func.isRequired,
  openPostModal: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(PostModal));
