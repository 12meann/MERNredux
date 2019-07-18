import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noUserImg from "../../images/blankAvatar.png";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCommentIcon from "@material-ui/icons/AddComment";
import MuiLink from "@material-ui/core/Link";
import { spawn } from "child_process";

const styles = {
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
  }
};

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
    const { classes, loading, post } = this.props;
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
            <IconButton aria-label="Settings">
              <MoreVertIcon color="primary" />
            </IconButton>
          }
          title={
            <MuiLink
              underline="none"
              component={Link}
              to={`/users/${post.postedBy._id}`}>
              <Typography variant="h6" color="primary">
                @ {!loading ? post.postedBy.username : <span>...</span>}
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
            <AddCommentIcon color="primary" />
            <Typography variant="body2">
              Comments{" "}
              <IconButton
                aria-expanded={expanded}
                aria-label="Show more"
                onClick={this.handleExpandClick}>
                <ExpandMoreIcon color="primary" />
              </IconButton>
            </Typography>
          </Fragment>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon color="primary" />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>where comments will go</CardContent>
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.post.loading
});
PostItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(PostItem));
