import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import noUserImg from "../../images/blankAvatar.png";
import MorePostButton from "./MorePostButton";
import clsx from "clsx";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { clearComments } from "../../store/actions/commentsAction";
import { getPost } from "../../store/actions/postActions";

import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import { DialogContent } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Comments from "../comment/Comments";

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
    // marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  heart: {
    marginLeft: "auto"
  },
  commentTitle: {
    margin: "0 10px",
    right: "-10px"
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
        fullWidth
        maxWidth="md">
        <Tooltip title="Close">
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
                  src={noUserImg}
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
                    @ {post.postedBy.username}
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
                  <Typography variant="body2" className={classes.commentTitle}>
                    Comments
                  </Typography>
                </Badge>
              ) : null}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </IconButton>
              <small className={classes.heart}>
                {post.likes.length > 0 ? post.likes.length : 0} likes
              </small>
              <IconButton aria-label="like">
                <FavoriteIcon color="primary" />
              </IconButton>
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
  classes: PropTypes.object.isRequired
  // post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { clearComments }
)(withStyles(styles)(PostModal));
