import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noUserImg from "../../images/blankAvatar.png";
import { openLoginModal } from "../../store/actions/modalActions";
import { clearComments } from "../../store/actions/commentsAction";
import MorePostButton from "./MorePostButton";
import PostModal from "./PostModal";
import LikePost from "./LikePost";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import AddCommentIcon from "@material-ui/icons/AddComment";

const styles = theme => ({
  card: {
    marginBottom: "20px"
  },
  avatar: {
    width: 75,
    height: 75,
    objectFit: "cover"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  post: {
    borderColor: theme.palette.primary.main,
    borderLeftStyle: "solid",
    border: `4px`,
    padding: "0 10px",
    margin: "0 30px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main
    }
  },
  comments: {
    padding: "0 10px",
    margin: "0 30px"
  },
  commentTitle: {
    margin: "0 10px",
    right: "-10px",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.secondary.main
    }
  },
  link: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  }
});

//from the feed
class PostItemCard extends Component {
  state = {
    openPostModal: false
  };
  handleOpenPostModal = () => {
    this.props.user
      ? this.setState({
          openPostModal: true
        })
      : this.props.openLoginModal();
  };
  handleClosePostModal = () => {
    this.setState({
      openPostModal: false
    });
    this.props.clearComments();
  };

  render() {
    const { classes, post, user } = this.props;
    const { openPostModal } = this.state;
    return (
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
              ? // ? post.postedBy
                post.postedBy._id === user._id && <MorePostButton post={post} />
              : null
            // : null
          }
          title={
            <MuiLink
              underline="none"
              component={Link}
              to={`/users/${post.postedBy._id}`}>
              <Typography variant="h6" color="primary" className={classes.link}>
                @ {post.postedBy.username}
              </Typography>
            </MuiLink>
          }
          subheader={moment(post.date.toString()).fromNow()}
        />
        <CardContent
          onClick={this.handleOpenPostModal}
          className={classes.postLink}>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            className={classes.post}>
            {post.content}
          </Typography>
        </CardContent>

        <CardActions className={classes.comments}>
          <Fragment>
            {post.comments.length > 0 ? (
              <Fragment>
                <AddCommentIcon color="primary" />
                <Badge badgeContent={post.comments.length} color="primary">
                  <Typography
                    variant="body2"
                    className={classes.commentTitle}
                    onClick={this.handleOpenPostModal}>
                    Comments
                  </Typography>
                </Badge>
              </Fragment>
            ) : (
              <Fragment>
                <AddCommentIcon color="primary" />
                <Typography
                  variant="body2"
                  className={classes.commentTitle}
                  onClick={this.handleOpenPostModal}>
                  Add Comment
                </Typography>
              </Fragment>
            )}

            <LikePost postId={post._id} post={post} />
          </Fragment>
        </CardActions>
        <PostModal
          openPostModal={openPostModal}
          handleOpenPostModal={this.handleOpenPostModal}
          handleClosePostModal={this.handleClosePostModal}
          post={post}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});
PostItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
  openLoginModal: PropTypes.func.isRequired,
  clearComments: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { openLoginModal, clearComments }
)(withStyles(styles)(PostItemCard));
