import React, { Component } from "react";
import { connect } from "react-redux";
import { getThreads } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";

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

  constructor(props) {
    super(props);
    this.state = {liked: false}
  }

  componentDidMount() {
    this.props.getThreads(this.props.match.params.id);
  }

  like = () => {
    this.setState({liked: true});
  };

  unlike = () => {
    this.setState({liked: false});
  };

  render() {
    const classes = this.props.classes;
    console.log("Local Storage: ", localStorage);
    console.log("threads", this.props.threads);
    return (
      <>
        {this.props.threads.map(t => {
            return (
                <div className={classes.root}>
                  <Grid
                      container
                      spacing={3}
                      justify={"center"}
                      alignItems={"center"}
                  >
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        {this.state.liked ?
                            <FavoriteIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={this.unlike}/>
                            :
                            <FavoriteBorderOutlinedIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={this.like}/>
                        }
                        &nbsp;{t.likes} points by&nbsp;
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Threads));
