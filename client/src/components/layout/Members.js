import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import { Link } from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import noUserImg from "../../images/blankAvatar.png";
import { getAllUsers } from "../../store/actions/authActions";

//MUI
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";

const styles = () => {};
export class Members extends Component {
  state = {
    members: null
  };

  componentDidMount() {
    this.props.getAllUsers();
    console.log(this.props.getAllUsers);
    this.setState({
      members: this.props.members
    });
  }

  render() {
    const { loading, classes } = this.props;
    const { members } = this.state;
    console.log(members);

    const membersList = members.map(member => {
      return (
        <MuiLink underline="none" component={Link} to={`/users/${member._id}`}>
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
              action={<Typography>View Profile</Typography>}
              title={
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.link}>
                  @ {member.username}
                </Typography>
              }
              subheader={moment(member.registeredDate.toString()).fromNow()}
            />
          </Card>
        </MuiLink>
      );
    });

    return (
      <Fragment>
        {loading ? <p>loading...</p> : members ? membersList : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  members: state.auth.users,
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(withStyles(styles)(Members));
