import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubmissions } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";
//Albert

const styleSheet = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});
export class Submissions extends Component {
  classes;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSubmissions(localStorage.getItem("user_id"));
  }

  render() {
    const classes = this.props.classes;
    console.log("Local Storage: ", localStorage);
    console.log("submissions", this.props.submissions);
    return (
      <>
        {this.props.submissions.map((s) => {
          return (
            <div className={classes.root}>
              {this.props.submissions ? (
                <Grid
                  container
                  spacing={3}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      {s.title} {s.url}{" "}
                    </Paper>
                    <Paper className={classes.paper}>
                      {s.punctuation} points by {s.user_id}{" "}
                      <Moment
                        interval={1000}
                        date={s.created_at}
                        durationFromNow
                      />{" "}
                      ago | unvote | 0 comments
                    </Paper>
                  </Grid>
                </Grid>
              ) : (
                <p>el usuario no ha hecho contributions</p>
              )}
            </div>
          );
        })}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    submissions: state.submissions,
  };
}

const mapDispatchToProps = {
  getSubmissions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Submissions));
