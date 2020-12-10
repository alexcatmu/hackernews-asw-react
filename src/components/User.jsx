import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import CakeIcon from '@material-ui/icons/Cake';
import Link from "@material-ui/core/Link";
import {Button} from "@material-ui/core";
import {getUser} from "../redux/actions";
import {connect} from "react-redux";
// Marc

const style = {
    height: "600px",
    margin: "0 auto",
    'marginTop': '2%',
    'marginBottom': '1%',
    'marginLeft': '3%',
};

export class User extends Component {

    componentDidMount() {
        this.props.getUser(this.props.match.params.id);
        console.log(this.props.user);
    }

    render() {
        return (
            <div style={style}>
                <Grid container spacing={1} direction="column">
                    <Grid item>
                        <TextField
                            id="username"
                            label={"User:"}
                            margin="normal"
                            style ={{width: '20%'}}
                            inputStyle ={{width: '20%'}}
                            value={this.props.user.username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="mail"
                            margin="normal"
                            label={"Created at:"}
                            type="email"
                            style ={{width: '20%'}}
                            inputStyle ={{width: '20%'}}
                            value={this.props.user.created_at}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CakeIcon/>
                                    </InputAdornment>
                                ),
                                readOnly: true,

                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="mail"
                            margin="normal"
                            label={"Karma:"}
                            style ={{width: '20%'}}
                            inputStyle ={{width: '20%'}}
                            value={this.props.user.karma}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FormatListNumberedIcon/>
                                    </InputAdornment>
                                ),
                                readOnly: true,

                            }}
                        />
                    </Grid>
                    <Grid item>
                        About:&nbsp;&nbsp;
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            defaultValue={this.props.user.about}
                            variant="outlined"
                            InputProps={{
                                readOnly: this.props.user.id !== parseInt(localStorage.getItem('user_id')),
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Link component="button"
                              align="left"
                              variant="body2"
                              color="inherit"
                              onClick={() => this.props.history.replace("/submitted/" + this.props.user.id)}
                        >
                            submissions</Link>
                    </Grid>
                    <Grid item>
                        <Link component="button"
                              align="left"
                              variant="body2"
                              color="inherit"
                              onClick={() => this.props.history.replace("/threads/" + this.props.user.id)}
                        >
                            comments</Link>
                    </Grid>
                    <Grid item>
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
                    <Grid item>
                        <Button variant="outlined">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)
(User);
