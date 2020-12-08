import React, {Component} from "react";
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
    render() {
        return (
            <>
                hello Submissions
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
      threads: state.submissions,
    };
  }
  
  const mapDispatchToProps = {
    getSubmissions,
  };
  

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styleSheet)(Submissions));
  