import React, {Component} from "react";
import {connect} from "react-redux";
import {getComments, postReply, unvote, vote} from "../redux/actions/index";
import isLikedForUser from "./utils/Likers"
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import 'moment-timezone';
import Moment from "react-moment";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import HowToRegIcon from "@material-ui/icons/HowToReg";
// Alex

const styleSheet = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
});


class Comments extends Component {
    classes;

    constructor(props) {
        super(props);
        this.state = {content: '', comment_id: '', liked: false, comments: ''}
    }

    componentDidMount() {
        this.props.getComments(this.props.match.params.id)
            .then(data => {
                let found = data.commentLikes.some(isLikedForUser)
                this.setState({comments: data, liked: found})
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        let body = {
            content: this.state.content,
            comment_id: this.state.comments.id
        }
        this.props.postReply(body)
            .then(response => {
                if (response.ok) {
                    let path = `/contributions/${this.state.comments.contribution_id}`
                    this.props.history.push(path);
                }
            });
    }

    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                {
                    this.state.comments ?
                        <Grid container spacing={3} justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {this.state.comments.user_id === parseInt(localStorage.getItem("user_id")) ?
                                        <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                                        :
                                        this.state.liked ?
                                            <FavoriteIcon
                                                style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                                onClick={(e) => this.unlike(e)}/>
                                            :
                                            <FavoriteBorderOutlinedIcon
                                                style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                                onClick={(e) => this.like(e)}/>
                                    }&nbsp;
                                    Created
                                    By&nbsp;
                                    <Link color="inherit" href={`/users/${this.state.comments.user_id}`}>
                                        {this.state.comments.username}
                                    </Link>&nbsp;
                                    <Moment
                                        date={this.state.comments.created_at}
                                        fromNow/>
                                    <br/>on:&nbsp;
                                    <Link color="inherit"
                                          href={`/contributions/${this.state.comments.contribution_id}`}>
                                        {this.state.comments.contribution_title}
                                    </Link>
                                    <div style={{marginBottom: '20px'}}>{this.state.comments.content}</div>
                                    <form className={classes.root} onSubmit={(e) => this.handleSubmit(e)}>
                                        <div>
                                            <TextField
                                                id="outlined-textarea"
                                                label="Your Reply"
                                                placeholder="Placeholder"
                                                multiline
                                                variant="outlined"
                                                fullWidth
                                                value={this.state.content}
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>
                                        <div style={{height: "20px"}}/>
                                        <Button type={"submit"} variant="contained" color="primary">
                                            Reply
                                        </Button>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={3} justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}/></Grid></Grid>
                }
            </div>
        )
    }

    handleChange(event) {
        this.setState({content: event.target.value})
    }

    like() {
        this.props.vote("comments", this.state.comments.id);
        this.setState({liked: true});
    }

    unlike() {
        this.props.unvote("comments", this.state.comments.id);
        this.setState({liked: false});
    }
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    getComments,
    postReply,
    unvote,
    vote
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(Comments));

