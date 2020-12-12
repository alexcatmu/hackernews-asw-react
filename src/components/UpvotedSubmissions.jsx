import React, {Component} from "react";
import {connect} from "react-redux";
import {getUpvotedSubmissions} from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import {withStyles} from "@material-ui/core";
import {User} from "./User";
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

class UpvotedSubmissions extends Component {

    constructor(props) {
        super(props);
        this.state = {liked: false}
    }
    componentDidMount() {
        this.props.getUpvotedSubmissions();
    }

    like = () => {
        this.setState({liked: true});
    };

    unlike = () => {
        this.setState({liked: false});
    };

    render() {
        const classes = this.props.classes;
        return (
            <>
                {this.props.upvotedSubmissions.map(sub => {
                    if (sub.user_id !== parseInt(localStorage.getItem('user_id'))) {
                        return (
                            <div className={classes.root}>
                                {this.props.upvotedSubmissions ? (
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
                                                &nbsp;&nbsp;{sub.title}&nbsp;&nbsp;
                                                <Link color="inherit" href={sub.url}>
                                                    {sub.url}
                                                </Link>
                                                <br/>
                                                {sub.punctuation} points by&nbsp;
                                                <Link color="inherit" href={"/users/" + sub.user_id}>
                                                    {sub.username}
                                                </Link>
                                                &nbsp;
                                                <Moment
                                                    interval={1000}
                                                    date={sub.created_at}
                                                    durationFromNow
                                                />
                                                &nbsp;ago |&nbsp;
                                                <Link color="inherit" href={"/contributions/" + sub.id}>
                                                    {sub.ncomments} comments
                                                </Link>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <p>el usuario no ha hecho contributions</p>
                                )}
                            </div>
                        );
                    }
                })}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        upvotedSubmissions: state.upvotedSubmissions,
    }
}

const mapDispatchToProps = {
    getUpvotedSubmissions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(UpvotedSubmissions));

