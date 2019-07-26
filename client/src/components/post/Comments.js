import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

//MUI
import { withStyles } from "@material-ui/styles";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
});

class Comments extends Component {
  render() {
    const { classes } = this.props;
    return (
      <CardContent>
        <Divider
          color="primary"
          classes={{ root: classes.root }}
          variant="inset"
        />
        {/* <Card>
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
          // action={
          //   user
          //     ? post.postedBy._id === user._id && (
          //         <MorePostButton postId={post._id} />
          //       )
          //     : null
          // }
          title={
            // <MuiLink
            //   underline="none"
            //   component={Link}
            //   to={`/users/${post.postedBy._id}`}>
              <Typography variant="h6" color="primary">
                @ {post.postedBy.username}
              </Typography>
            // </MuiLink>
          }
          // subheader={moment(post.date.toString()).fromNow()}
        />
        </Card> */}
      </CardContent>
    );
  }
}
Comments.propTypes = {};

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(withStyles(styles)(Comments));
