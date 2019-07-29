import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import Comments from "../comment/Comments";
import { Link } from "react-router-dom";
import noUserImg from "../../images/blankAvatar.png";
import MorePostButton from "./MorePostButton";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiLink from "@material-ui/core/Link";

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
    border: "4px",
    padding: "0 10px",
    margin: "0 30px"
  },
  comments: {
    padding: "0 10px",
    margin: "0 30px"
  },
  // heart: {
  //   marginRight: "auto"
  // },
  commentTitle: {
    margin: "0 10px",
    right: "-10px"
  }
});

//from the feed
class PostItem extends Component {
  state = {
    expanded: false
  };
  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };
  render() {
    const { classes, post, user } = this.props;

    const { expanded } = this.state;
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
              <Typography variant="h6" color="primary">
                @ {post.postedBy.username}
              </Typography>
            </MuiLink>
          }
          subheader={moment(post.date.toString()).fromNow()}
        />
        <CardContent>
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
              <Badge
                className={classes.badge}
                badgeContent={post.comments.length}
                color="primary">
                <Typography variant="body2" className={classes.commentTitle}>
                  Comments
                </Typography>
              </Badge>
            ) : (
              <Typography variant="body2">Comments</Typography>
            )}
            <IconButton
              aria-expanded={expanded}
              aria-label="Show more"
              onClick={this.handleExpandClick}>
              <ExpandMoreIcon color="primary" />
            </IconButton>
            <IconButton aria-label="like" className={classes.heart}>
              <FavoriteIcon color="primary" />
            </IconButton>
            <small>{post.likes.length > 0 ? post.likes.length : 0} likes</small>
          </Fragment>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments comments={post.comments} />
        </Collapse>
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

export default connect(mapStateToProps)(withStyles(styles)(PostItem));
