import React, {Component} from "react";
import {connect} from "react-redux";
import {getComments} from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import 'moment-timezone';
import Moment from "react-moment";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Alex

const styleSheet = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});


class Comments extends Component {
    classes;

    constructor(props) {
        super(props);
        this.state = {content: '', comment_id: ''}
    }

    componentDidMount() {
        this.props.getComments(this.props.match.params.id);
    }


    handleSubmit(event) {
        event.preventDefault();
        let body = {
            content: this.state.content,
            comment_id: this.props.comments.id
        }
        console.log(body)
        //hacer call post a hackernews/replies con body = body
    }

    render() {
        const classes = this.props.classes
        console.log('commjsx', this.props.comments);
        return (
            <div className={classes.root}>
                {
                    this.props.comments ?
                        <Grid container spacing={3} justify={"center"} alignItems={"center"}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    {true ?
                                        <FavoriteIcon style={{color: "red"}}/>
                                        :
                                        <FavoriteBorderOutlinedIcon style={{color: "red"}}/>
                                    }
                                    Created
                                    By {this.props.comments.user_id} <Moment interval={1000}
                                                                             date={this.props.comments.created_at}
                                                                             durationFromNow/> ago </Paper>
                                <Paper className={classes.paper}>{this.props.comments.content}</Paper>
                                <Paper className={classes.paper}>
                                    <form className={classes.root} onSubmit={(e) => this.handleSubmit(e)}>
                                        <div>
                                            <TextField
                                                id="outlined-textarea"
                                                label="Multiline Placeholder"
                                                placeholder="Placeholder"
                                                multiline
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
                        <p>no tenemos comments</p>
                }
            </div>
        )
    }

    handleChange(event) {
        this.setState({content: event.target.value})
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
    }
}

const mapDispatchToProps = {
    getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(Comments));

