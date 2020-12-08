import React, {Component} from "react";
import {connect} from "react-redux";
import {getComments} from "../redux/actions/index";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent} from "@material-ui/core";

// Alex
class Comments extends Component {

    componentDidMount() {
        this.props.getComments(this.props.match.params.id);
    }

    render() {
        console.log('comments', this.props.comments)
        return (
            <>
                {
                    this.props.comments ?
                        <Grid container spacing={4}>
                            <Card>
                                <CardContent>
                                    holiiii
                                </CardContent>
                            </Card>
                        </Grid>
                    :
                        <p>no tenemos comments</p>
                }
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)
(Comments);

