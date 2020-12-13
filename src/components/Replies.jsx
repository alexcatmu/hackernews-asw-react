import React, {Component} from "react";
import {connect} from "react-redux";
import {getReplies, postReplyReply} from "../redux/actions/index";
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


class Replies extends Component {
    classes;

    constructor(props) {
        super(props);
        this.state = {content: '', liked: false, replies: ''}
    }

    componentDidMount() {
        this.props.getReplies(this.props.match.params.id)
            .then(data => {
                console.log("ya hemos recuperado", data)
                this.setState({replies: data})
            });
    }


    handleSubmit(event) {
        event.preventDefault();
        let body = {
            content: this.state.content,
            comment_id: this.state.replies.comment_id,
            reply_id: this.state.replies.id
        }
        this.props.postReplyReply(body)
            .then((data) => {
                let path = `/contributions/${this.state.replies.contribution_id}`
                this.props.history.push(path);
                console.log("holaaaa", data)
            });
    }

    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                {
                    this.state.replies ?
                        <Grid container spacing={3} justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {this.state.liked ?
                                        <FavoriteIcon style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                                      onClick={(e) => this.unlike(e)}/>
                                        :
                                        <FavoriteBorderOutlinedIcon style={{color: "red", cursor: "pointer", fontSize: "small"}}
                                                                    onClick={(e) => this.like(e)}/>
                                    }&nbsp;
                                    Created
                                    By&nbsp;
                                    <Link color="inherit" href={`/users/${this.state.replies.user_id}`}>
                                        {this.state.replies.username}
                                    </Link>&nbsp;
                                    <Moment interval={1000}
                                            date={this.state.replies.created_at}
                                            durationFromNow/> ago
                                    <br/>
                                    on:&nbsp;
                                    <Link color="inherit" href={`/contributions/${this.state.replies.contribution_id}`}>
                                        {this.state.replies.contribution_title}
                                    </Link>
                                    <div style={{marginBottom: '20px'}}>{this.state.replies.content}</div>
                                    <form className={classes.root} onSubmit={(e) => this.handleSubmit(e)}>
                                        <div>
                                            <TextField
                                                id="outlined-textarea"
                                                label="Your Reply"
                                                placeholder="Placeholder"
                                                multiline
                                                fullWidth
                                                variant="outlined"
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

    like(event) {
        console.log("like it");
        this.setState({liked: true});
    }

    unlike(event) {
        console.log("unliked IT");
        this.setState({liked: false});
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    getReplies,
    postReplyReply,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(Replies));

