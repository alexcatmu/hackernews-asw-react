import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubmissions } from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import "moment-timezone";
import Moment from "react-moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";
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

  constructor(props) {
    super(props);
    this.state = {liked: false}
  }

  componentDidMount() {
    this.props.getSubmissions(this.props.match.params.id);
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
    console.log("submissions", this.props.submissions);
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
                        {this.state.liked ?
                            <FavoriteIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={this.unlike}/>
                            :
                            <FavoriteBorderOutlinedIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={this.like}/>
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
                            interval={1000}
                            date={s.created_at}
                            durationFromNow
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styleSheet)(Submissions));
