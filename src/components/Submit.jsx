import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button, withStyles} from "@material-ui/core";
import {submit} from "../redux/actions";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";

//TODO: Alexandre

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

export class Submit extends Component {

    constructor(props) {
        super(props);
        this.state = {title: '', url: '', text: '', error: ''}
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        //TODO: Controlar que no está vacío el título
        this.props.submit(this.state.title, this.state.url, this.state.text)
            .then((response) => {
                if (response.error) {
                    this.setState({error: response.error})
                }
                else if (response.contribution_id) {
                    this.props.history.push('/contributions/' + response.contribution_id);
                }
                else this.props.history.push('/newest');
            });
    }

    render() {
        const classes = this.props.classes;

        return (
            <>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {this.state.error ?
                            <Grid item xs={12}>
                                <Alert severity={"error"}>{this.state.error}</Alert>
                            </Grid>
                            :
                            <>
                            </>
                        }
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                <TextField
                                    id="title"
                                    label="Title"
                                    variant="outlined"
                                    value={this.state.title}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="url"
                                    label="Url"
                                    variant="outlined"
                                    value={this.state.url}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <TextField
                                    id="text"
                                    label="Text"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    value={this.state.text}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={() => this.handleSubmit()} variant="outlined">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </>

        );
    }
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    submit,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
(withStyles(styleSheet)(Submit));
