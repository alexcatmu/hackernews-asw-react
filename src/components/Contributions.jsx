import React, {Component} from "react";
import {postComment, unvote, vote} from "../redux/actions";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {getContribution} from "../redux/actions/Contributions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Link from "@material-ui/core/Link";
import Moment from "react-moment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
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

export class Contributions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contribution: '',
            content: '',
            success: false
        }
    }

    componentDidMount() {
        this.props.getContribution(this.props.match.params.id)
            .then(response => {
                this.setState({
                    contribution: response
                });
            });
    }

    like = async (type, id) => {
        await this.props.vote(type, id);
        this.props.getContribution(this.props.match.params.id)
            .then(response => {
                this.setState({
                    contribution: response
                });
            });
    };

    unlike = async (type, id) => {
        await this.props.unvote(type, id);
        this.props.getContribution(this.props.match.params.id)
            .then(response => {
                this.setState({
                    contribution: response
                });
            });
    };

    handleSubmit(event) {
        event.preventDefault();
        let body = {
            content: this.state.content,
            contribution_id: this.state.contribution.id
        }
        this.props.postComment(body).then(response1 => {
            if (response1.ok) {
                this.setState({
                    content: '',
                    success: true,
                })
                this.props.getContribution(this.props.match.params.id)
                    .then(response => {
                        this.setState({
                            contribution: response
                        });
                    });
            }
        });
    }


    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={3}
                >
                    {this.state.success ?
                        <Grid item xs={12}>
                            <Alert severity={"success"}>Comment successfully saved</Alert>
                        </Grid>
                        :
                        <></>
                    }





                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {this.state.contribution.user_id === parseInt(localStorage.getItem("user_id")) ?
                                <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                                :
                                this.state.contribution?.users_liked?.includes(parseInt(localStorage.getItem('user_id'))) ?
                                    <FavoriteIcon
                                        style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                        onClick={() => this.unlike("contributions", this.state.contribution.id)}/>
                                    :
                                    <FavoriteBorderOutlinedIcon
                                        style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                        onClick={() => this.like("contributions", this.state.contribution.id)}/>
                            }
                            &nbsp;&nbsp;{this.state.contribution.title}&nbsp;&nbsp;
                            <Link color="inherit" href={this.state.contribution?.url}>
                                <span>{this.state.contribution?.url}</span>
                            </Link>
                            <br/>
                            {this.state.contribution.punctuation} points by&nbsp;
                            <Link color="inherit" href={"/users/" + this.state.contribution?.user_id}>
                                <span>{this.state.contribution?.username}</span>
                            </Link>
                            &nbsp;
                            <Moment
                                date={this.state.contribution.created_at}
                                fromNow
                            />
                            &nbsp;|&nbsp;
                            <Link color="inherit" href={"/contributions/" + this.state.contribution?.id}>
                                {this.state.contribution?.comments?.length} comments
                            </Link>
                            <br/>
                            <div style={{marginBottom: '20px', marginTop: '10px'}}>{this.state.contribution.text}</div>
                            <form className={classes.root} onSubmit={(e) => this.handleSubmit(e)}>
                                <div>
                                    <TextField
                                        id="outlined-textarea"
                                        label="Add a comment"
                                        placeholder="Placeholder"
                                        multiline
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.content}
                                        onChange={(e) => this.setState({content: e.target.value})}
                                    />
                                </div>
                                <div style={{height: "20px"}}/>
                                <Button disabled={this.state.content === ''} type={"submit"} variant="contained" color="primary">
                                    Add comment
                                </Button>
                            </form>
                        </Paper>
                    </Grid>







                </Grid>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {this.state.contribution.comments?.map(comment => {
                                return (
                                    <Grid
                                        key={comment.id}
                                        container
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <Paper className={classes.paper}>
                                                {comment.user_id === parseInt(localStorage.getItem("user_id")) ?
                                                    <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                                                    :
                                                    comment.users_liked?.includes(parseInt(localStorage.getItem('user_id'))) ?
                                                        <FavoriteIcon
                                                            style={{
                                                                color: "red",
                                                                cursor: "pointer",
                                                                fontSize: "small"
                                                            }}
                                                            onClick={() => this.unlike("comments", comment.id)}/>
                                                        :
                                                        <FavoriteBorderOutlinedIcon
                                                            style={{
                                                                color: "red",
                                                                cursor: "pointer",
                                                                fontSize: "small"
                                                            }}
                                                            onClick={() => this.like("comments", comment.id)}/>
                                                }
                                                &nbsp;&nbsp;
                                                <Link color="inherit" href={"/users/" + comment?.user_id}>
                                                    {comment?.username}
                                                </Link>&nbsp;&nbsp;
                                                <Moment
                                                    date={comment.created_at}
                                                    fromNow
                                                />
                                                <br/>
                                                {comment.content}
                                                <br/>
                                                <Link color="inherit" href={"/comments/" + comment?.id}>
                                                    reply
                                                </Link>
                                                {comment.replies?.map(reply => {
                                                    return (
                                                        <ReplyPaper key={reply.id} reply={reply} classes={classes} fun={{"like": this.like, "unlike": this.unlike}}/>
                                                    );

                                                })}
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function ReplyPaper(props) {
    if (!props.reply) return (<></>);
    else {
        return (
                <Grid key={props.reply.id} style={{marginTop: "5px"}} item xs={12}>
                    <Paper className={props.classes.paper} style={{minWidth: "256px"}}>
                        {props.reply.user_id === parseInt(localStorage.getItem("user_id")) ?
                            <HowToRegIcon style={{color: "black", fontSize: "small"}}/>
                            :
                            props.reply.users_liked?.includes(parseInt(localStorage.getItem('user_id'))) ?
                                <FavoriteIcon
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "small"
                                    }}
                                    onClick={() => props.fun.unlike("replies", props.reply.id)}/>
                                :
                                <FavoriteBorderOutlinedIcon
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "small"
                                    }}
                                    onClick={() => props.fun.like("replies", props.reply.id)}/>
                        }
                        &nbsp;&nbsp;
                        <Link color="inherit" href={"/users/" + props.reply?.user_id}>
                            {props.reply?.username}
                        </Link>&nbsp;&nbsp;
                        <Moment
                            date={props.reply.created_at}
                            fromNow
                        />
                        <br/>
                        {props.reply.content}
                        <br/>
                        <Link color="inherit" href={"/replies/" + props.reply?.id}>
                            reply
                        </Link>
                        {props.reply.replies?.map(reply => {
                            return (
                                <ReplyPaper key={reply.id} reply={reply} classes={props.classes} fun={{"like": props.fun.like, "unlike": props.fun.unlike}}/>
                            );
                        })}
                    </Paper>
                </Grid>
        );
    }
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    getContribution,
    postComment,
    vote,
    unvote
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(Contributions));