import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {getUpvotedComments} from "../redux/actions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";
// Marc

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

export class UpvotedComments extends Component {

    componentDidMount() {
        this.props.getUpvotedComments();
    }

    render() {
        const classes = this.props.classes;
        return (
            <>
                {this.props.upvotedComments.map(comment => {
                    if (comment.user_id !== parseInt(localStorage.getItem('user_id'))) {
                        return (
                            <div key={comment.id} className={classes.root}>
                                <Grid
                                    container
                                    spacing={3}
                                    justify={"center"}
                                    alignItems={"center"}
                                >
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            {comment.users_liked.includes(parseInt(localStorage.getItem('user_id'))) ?
                                                <FavoriteIcon style={{color: "red", fontSize: "small"}}/>
                                                :
                                                <FavoriteBorderOutlinedIcon style={{color: "red", fontSize: "small"}}/>
                                            }
                                            &nbsp;{comment.likes} points by&nbsp;
                                            <Link color="inherit" href={"/users/" + comment.user_id}>
                                                {comment.username}
                                            </Link>
                                            &nbsp;
                                            <Moment
                                                date={comment.created_at}
                                                fromNow
                                            />
                                            &nbsp;| on&nbsp;
                                            <Link color="inherit" href={"/contributions/" + comment.contribution_id}>
                                                {comment.contrib_title}
                                            </Link>
                                            <br/>
                                            {comment.content}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    }
                    return (
                        <div/>
                    );
                })}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        upvotedComments: state.upvotedComments,
    };
}

const mapDispatchToProps = {
    getUpvotedComments,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styleSheet)(UpvotedComments));
