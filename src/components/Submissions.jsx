import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubmissions, unvote, vote } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";
import HowToRegIcon from "@material-ui/icons/HowToReg";
//Albert

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
export class Submissions extends Component {

  componentDidMount() {
    this.props.getSubmissions(this.props.match.params.id);
  }

  like = async (contribution_id) => {
    await this.props.vote("contributions", contribution_id);
    this.props.getSubmissions(this.props.match.params.id);

  };

  unlike = async (contribution_id) => {
    await this.props.unvote("contributions", contribution_id);
    this.props.getSubmissions(this.props.match.params.id);
  };

  render() {
    const classes = this.props.classes;
    return (
      <>
        {this.props.submissions.map(s => {
            return (
                <div key={s.id} className={classes.root}>
                  <Grid
                      container
                      spacing={3}
                      justify={"center"}
                      alignItems={"center"}
                  >
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        {s.user_id === parseInt(localStorage.getItem("user_id")) ?
                            <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                            :
                            s.users_liked.includes(parseInt(localStorage.getItem('user_id'))) ?
                                <FavoriteIcon
                                    style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                    onClick={() => this.unlike(s.id)}/>
                                :
                                <FavoriteBorderOutlinedIcon
                                    style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                    onClick={() => this.like(s.id)}/>
                        }
                        &nbsp;&nbsp;{s.title}&nbsp;&nbsp;
                        <Link color="inherit" href={s.url}>
                          {s.url}
                        </Link>
                        <br/>
                        {s.punctuation} points by&nbsp;
                        <Link color="inherit" href={"/users/" + s.user_id}>
                          {s.username}
                        </Link>
                        &nbsp;
                        <Moment
                            date={s.created_at}
                            fromNow
                        />
                        &nbsp;ago |&nbsp;
                        <Link color="inherit" href={"/contributions/" + s.id}>
                          {s.ncomments} comments
                        </Link>
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
    submissions: state.submissions,
  };
}

const mapDispatchToProps = {
  getSubmissions,
  vote,
  unvote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Submissions));
