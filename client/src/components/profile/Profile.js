import React, { Component } from "react";
import noUserImg from "../../images/blankAvatar.png";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import MoreProfileButton from "./MoreProfileButton";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  card: {
    position: "relative",
    textAlign: "center",
    padding: 20
  },
  progress: {
    postion: "absolute"
  },
  content: {
    textAlign: "center"
  },
  img: {
    borderRadius: "50%"
  }
});

class Profile extends Component {
  render() {
    const { user, classes, loading } = this.props;
    return (
      <div>
        {user ? (
          <Card className={classes.card}>
            <MoreProfileButton />
            <CardMedia
              className={classes.img}
              component="img"
              alt="no user image"
              // height="140"
              image={noUserImg}
              title="no user image"
            />
            <CardContent className={classes.content}>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>@ {user.username} </strong>
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="span">
                <CalendarToday color="secondary" />
                Member Since{" "}
                <strong>
                  {moment(user.registeredDate).format("MMM Do YY")}
                </strong>
              </Typography>
            </CardContent>
          </Card>
        ) : loading ? (
          <CircularProgress size={250} className={classes.progress} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Profile);
