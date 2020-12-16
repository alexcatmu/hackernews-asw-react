import React, { Component } from "react";
import { connect } from "react-redux";
import { getThreads, vote, unvote } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";
import HowToRegIcon from "@material-ui/icons/HowToReg";

// Albert
const styleSheet = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
});

export class Threads extends Component {

  componentDidMount() {
    if (this.props.match.params.id === "null") {
      this.props.history.push("/login");
    }
    this.props.getThreads(this.props.match.params.id);
  }

  like = async (contribution_id) => {
    await this.props.vote("comments", contribution_id);
    this.props.getSubmissions(this.props.match.params.id);

  };

  unlike = async (contribution_id) => {
    await this.props.unvote("comments", contribution_id);
    this.props.getSubmissions(this.props.match.params.id);
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        {this.props.threads.map(t => {
            return (
                <div key={t.id} className={classes.root}>
                  <Grid
                      container
                      spacing={3}
                      justify={"center"}
                      alignItems={"center"}
                  >
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        {t.user_id === parseInt(localStorage.getItem("user_id")) ?
                            <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                            :
                            t.users_liked.includes(parseInt(localStorage.getItem('user_id'))) ?
                                <FavoriteIcon
                                    style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                    onClick={() => this.unlike(t.id)}/>
                                :
                                <FavoriteBorderOutlinedIcon
                                    style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                    onClick={() => this.like(t.id)}/>
                        }
                        &nbsp;{t.likes + 1} points by&nbsp;
                        <Link color="inherit" href={"/users/" + t.user_id}>
                          {t.username}
                        </Link>
                        &nbsp;
                        <Moment
                            interval={1000}
                            date={t.created_at}
                            durationFromNow
                        />
                        &nbsp;ago | on&nbsp;
                        <Link color="inherit" href={"/contributions/" + t.contribution_id}>
                          {t.contrib_title}
                        </Link>
                        <br/>
                        {t.content}
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
            );
          })}
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
  vote,
  unvote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Threads));
