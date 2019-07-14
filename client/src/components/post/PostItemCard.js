import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
// import noUser from "../../images/blankAvatar";
//MUI
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
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
import MuiLink from "@material-ui/core/Link";

const styles = {
  card: {
    marginBottom: "20px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
    // transition: theme.transitions.create("transform", {
    //   duration: theme.transitions.duration.shortest
    // })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
};

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
    const { classes, post } = this.props;
    const { expanded } = this.state;

    return (
      <MuiLink underline="none" component={Link} to={`/posts/${post._id}`}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="Settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.postedBy.username}
            subheader={moment(post.date.toString()).fromNow()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Typography variant="body1"> Comments</Typography>
            <IconButton
              // className={clsx(classes.expand, {
              //   [classes.expandOpen]: expanded
              // })}
              onClick={this.handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>where comments will go</CardContent>
          </Collapse>
        </Card>
      </MuiLink>
    );
  }
}

export default withStyles(styles)(PostItem);
