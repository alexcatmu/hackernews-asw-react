import React, { Component } from "react";
import { connect } from "react-redux";
import { getThreads } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";

// Albert
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

export class Threads extends Component {
  classes;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getThreads(localStorage.getItem("user_id"));
  }

  render() {
    const classes = this.props.classes;
    console.log("Local Storage: ", localStorage);
    console.log("threads", this.props.threads);
    return (
      <>
        {/*       
        {this.props.threads.map((t) => {
            
          return (
            <div className={classes.root}>
              {this.props.threads ? (
                <Grid
                  container
                  spacing={3}
                  justify={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      {t.punctuation}
                      points by {t.username}{" "}
                      <Moment
                        interval={1000}
                        date={this.props.comments.created_at}
                        durationFromNow
                      />{" "}
                      ago | on {t.contribution}{" "}
                    </Paper>
                    <Paper className={classes.paper}>{t.content}</Paper>
                  </Grid>
                </Grid>
              ) : (
                <p>el usuario no ha hecho comments</p>
              )}
            </div>
          );
        })} */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    threads: state.threads,
  };
}

const mapDispatchToProps = {
  getThreads,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Threads));
