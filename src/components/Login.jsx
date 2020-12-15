import React from "react";
import {connect} from "react-redux";
import {getUserByToken, logout} from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {Button, withStyles} from "@material-ui/core";

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

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
            text: "Log in",
            error: false,
            succes: false,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.setState({
                text: "Log out",
                key: token
            })
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }


    handleLogin = () => {
        if (this.state.text === "Log in") {
            this.props.getUserByToken(this.state.key).then(response => {
                if (response.ok) {
                    this.setState({
                        text: "Log out",
                        error: false,
                        success: true,
                    })
                } else {
                    this.setState({
                        error: true,
                        success: false,
                        key: ""
                    })
                }
            });
        } else {
            this.props.logout();
            this.setState({
                key: "",
                text: "Log in",
            });
        }
    };

    render() {
        const classes = this.props.classes;
        return (
            <>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} hidden={!this.state.error}>
                            <Alert severity="error" hidden={true}> User not found </Alert>
                        </Grid>
                        <Grid item xs={12} hidden={!this.state.success}>
                            <Alert severity="success">Successfully logged</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="key"
                                    label="API KEY"
                                    variant="outlined"
                                    value={this.state.key}
                                    onChange={(e) => this.handleChange(e)}
                                />
                                &nbsp; &nbsp; &nbsp;
                                <Button size="large" onClick={() => this.handleLogin()} variant="outlined">
                                    {this.state.text}
                                </Button>
                            </Paper>

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
    getUserByToken,
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(Login));