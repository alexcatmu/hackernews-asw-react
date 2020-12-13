import React, {Component} from "react";
import {connect} from "react-redux";
import {getNewest, unvote, vote} from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import {withStyles} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";

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

export class Newest extends Component {

    componentDidMount() {
        this.props.getNewest();
    }

    like = async(contribution_id) => {
        await this.props.vote("contributions", contribution_id);
        this.props.getNewest();

    };

    unlike = async(contribution_id) => {
        await this.props.unvote("contributions", contribution_id);
        this.props.getNewest();
    };

    render() {
        const classes = this.props.classes;
        return (
            <>
                {this.props.newest.map(sub => {
                    return (
                        <div key={sub.id} className={classes.root}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        {sub.users_liked.includes(parseInt(localStorage.getItem('user_id'))) ?
                                            <FavoriteIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={() => this.unlike(sub.id)}/>
                                            :
                                            <FavoriteBorderOutlinedIcon style={{color: "red", cursor:"pointer", fontSize: "small"}} onClick={() => this.like(sub.id)}/>
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
                        </div>
                    );
                })}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        newest: state.newest,
    }
}

const mapDispatchToProps = {
    getNewest,
    vote,
    unvote,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(Newest));
