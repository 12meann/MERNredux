import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actions/authActions";
import Loading from "./Loading";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const styles = theme => ({
  username: {
    display: "inline"
  },
  users: {
    margin: "20px auto 0 auto"
  },
  card: {
    "&:hover": {
      color: theme.palette.secondary.light,
      backgroundColor: "#f6fbfc"
    }
  }
});
export class Members extends Component {
  state = {
    members: null
  };

  componentDidMount() {
    this.props.getAllUsers();
    console.log(this.props.getAllUsers);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.members !== props.members) {
      return {
        members: props.members
      };
    }
    return null;
  }

  render() {
    const { loading, classes } = this.props;
    const { members } = this.state;

    const membersList = members
      ? members.map(member => {
          return (
            <Grid container alignItems="center" key={member._id}>
              <Grid item sm={12} md={8} className={classes.users}>
                <MuiLink
                  underline="none"
                  component={Link}
                  to={`/users/${member._id}`}>
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="User Image"
                          src={member.image}
                          alt="profile image"
                        />
                      }
                      action={<Typography>View Profile</Typography>}
                      title={
                        <Fragment>
                          <Typography
                            variant="h6"
                            color="primary"
                            className={classes.username}>
                            @{member.username}{" "}
                          </Typography>
                          <small>
                            {member.likes
                              ? member.likes.length === 1
                                ? `${member.likes.length} like`
                                : member.likes.length > 0
                                ? `${member.likes.length} likes`
                                : `0 like`
                              : `0 like`}
                          </small>
                        </Fragment>
                      }
                      subheader={
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "15rem"
                          }}>
                          {member.about ? (
                            <Typography
                              noWrap
                              color="textSecondary"
                              component="p">
                              {member.about}...
                            </Typography>
                          ) : null}
                        </div>
                      }
                    />
                  </Card>
                </MuiLink>
              </Grid>
            </Grid>
          );
        })
      : null;
    const loadingList = (
      <Grid container>
        <Grid item sm={12} md={8} className={classes.users}>
          <Loading />
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          color="secondary">
          Members
        </Typography>
        {loading ? loadingList : members ? membersList : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  members: state.auth.users,
  loading: state.auth.loading
});

Members.propTypes = {
  members: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getAllUsers }
)(withStyles(styles)(Members));
