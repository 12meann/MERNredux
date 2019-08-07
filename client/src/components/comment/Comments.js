import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import noUserImg from "../../images/blankAvatar.png";
import { showComments } from "../../store/actions/commentsAction";
import MoreCommentButton from "./MoreCommentButton";

//MUI
import { withStyles } from "@material-ui/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddComment from "./AddComment";
import LikeComment from "./LikeComment";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: "2%"
  },
  commentSection: {
    paddingLeft: "10%"
  },
  cardHeader: {
    marginTop: "2%"
  },
  card: {
    backgroundColor: theme.palette.background.default,
    marginBottom: "10px"
  },
  comment: {
    borderLeft: `${theme.palette.secondary.light} 4px solid`,
    padding: "0 10px",
    margin: "10px"
  },
  heart: {
    marginLeft: "auto"
  }
});

class Comments extends Component {
  componentDidMount() {
    this.props.showComments(this.props.postId);
  }
  render() {
    const { classes, comments, user, postId, loading } = this.props;

    return (
      <CardContent className={classes.commentSection}>
        <AddComment postId={postId} />
        {comments ? (
          loading ? (
            <p>loading...</p>
          ) : comments.length === 0 ? (
            <Typography align="center" variant="caption">
              <em>No comment yet.</em>
            </Typography>
          ) : (
            comments.map(comment => (
              <Card className={classes.card} key={comment._id}>
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
                      ? comment.commentedBy._id === user._id && (
                          <MoreCommentButton
                            comment={comment}
                            postId={postId}
                          />
                        )
                      : null
                  }
                  title={
                    <Fragment>
                      <Typography variant="body2" color="primary">
                        <MuiLink
                          underline="none"
                          component={Link}
                          to={`/users/${comment.commentedBy._id}`}>
                          @ {comment.commentedBy.username}{" "}
                        </MuiLink>
                        <Typography variant="caption" color="textPrimary">
                          {moment(comment.date.toString()).fromNow()}
                        </Typography>
                      </Typography>
                    </Fragment>
                  }
                  subheader={
                    <Fragment>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        // component="p"
                        className={classes.comment}>
                        {comment.content}
                      </Typography>
                      <LikeComment
                        comment={comment}
                        commentId={comment._id}
                        postId={postId}
                        className={classes.heart}
                      />
                    </Fragment>
                  }
                />
              </Card>
            ))
          )
        ) : null}
      </CardContent>
    );
  }
}
Comments.propTypes = {
  user: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  showComments: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  comments: state.comment.comments,
  loading: state.comment.loading
});
export default connect(
  mapStateToProps,
  { showComments }
)(withStyles(styles)(Comments));
