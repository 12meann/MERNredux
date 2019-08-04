import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noUserImg from "../../images/blankAvatar.png";
import MorePostButton from "./MorePostButton";
import { openLoginModal } from "../../store/actions/modalActions";
import { clearComments } from "../../store/actions/commentsAction";
import { getPost } from "../../store/actions/postActions";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MuiLink from "@material-ui/core/Link";
import PostModal from "./PostModal";

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
    borderColor: "rgba(40, 167, 69, 1)",
    borderLeftStyle: "solid",
    border: `4px`,
    padding: "0 10px",
    margin: "0 30px"
  },
  comments: {
    padding: "0 10px",
    margin: "0 30px"
  },
  heart: {
    marginLeft: "auto"
  },
  commentTitle: {
    margin: "0 10px",
    right: "-10px"
  },
  link: {
    "&:hover": {
      color: theme.palette.secondary.light
    }
  },
  postLink: {
    "&:hover": {
      cursor: "pointer"
    },
    "& p:hover": {
      color: theme.palette.secondary.light
    }
  }
});

//from the feed
class PostItem extends Component {
  state = {
    openPostModal: false,
    commentCount: 0,
    likeCount: null
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
  componentDidMount() {
    this.setState({
      commentCount: this.props.post.comments.length
    });
  }

  render() {
    const { classes, post, user } = this.props;

    const { openPostModal, commentCount } = this.state;
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
        {/* ============================= */}

        <CardActions className={classes.comments}>
          <Fragment>
            {commentCount > 0 ? (
              <Badge
                className={classes.badge}
                badgeContent={commentCount}
                color="primary">
                <Typography variant="body2" className={classes.commentTitle}>
                  Comments
                </Typography>
              </Badge>
            ) : null}

            <small className={classes.heart}>
              {post.likes.length > 0 ? post.likes.length : 0} likes
            </small>
            <IconButton aria-label="like">
              <FavoriteIcon color="primary" />
            </IconButton>
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
  loading: state.post.loading,
  user: state.auth.user
});
PostItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { openLoginModal, clearComments }
)(withStyles(styles)(PostItem));
