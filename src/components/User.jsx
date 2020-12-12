import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {AccountCircle} from "@material-ui/icons";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CakeIcon from '@material-ui/icons/Cake';
import Link from "@material-ui/core/Link";
import {Button, withStyles} from "@material-ui/core";
import {getUser, putUser} from "../redux/actions";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
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

export class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
        console.log(this.props.user);
    }

    handlePut = () => {
        let about = document.getElementById("about").value
        this.props.putUser(about)
    };

    render() {
        const classes = this.props.classes;
        return (
            <>
            <div className={classes.root}>
                <Grid container spacing={3} justify={"left"} alignItems={"left"}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <AccountCircle/> USER:
                            <br/>
                            {this.props.user.username}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <CakeIcon/> Created at:
                            <br/>
                            {this.props.user.created_at}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <FormatListNumberedIcon/> Karma:
                            <br/>
                            {this.props.user.karma}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            About:
                            <br/>
                            <TextField
                                fullWidth
                                id="about"
                                multiline
                                rows={4}
                                defaultValue={this.props.user.about}
                                variant="outlined"
                                InputProps={{
                                    readOnly: this.props.user.id !== parseInt(localStorage.getItem('user_id')),
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Link component="button"
                                  align="left"
                                  variant="body2"
                                  color="inherit"
                                  onClick={() => this.props.history.replace("/submitted/" + this.props.user.id)}
                            >
                                submissions</Link>
                            <Grid item>
                                <Link component="button"
                                      align="left"
                                      variant="body2"
                                      color="inherit"
                                      onClick={() => this.props.history.replace("/threads/" + this.props.user.id)}
                                >
                                    comments</Link>
                            </Grid>
                            <Grid item hidden={this.props.user.id !== parseInt(localStorage.getItem('user_id'))}>
                                <Link component="button"
                                      align="left"
                                      variant="body2"
                                      color="inherit"
                                      onClick={() => this.props.history.replace("/upvoted/submissions")}
                                >
                                    upvoted submissions</Link>
                                &nbsp;/&nbsp;
                                <Link component="button"
                                      align="left"
                                      variant="body2"
                                      color="inherit"
                                      onClick={() => this.props.history.replace("/upvoted/comments")}
                                >
                                    upvoted comments</Link>
                                &nbsp;(private)
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item hidden={this.props.user.id !== parseInt(localStorage.getItem('user_id'))}>
                        <Button onClick={this.handlePut} variant="outlined" >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    getUser,
    putUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(User));
