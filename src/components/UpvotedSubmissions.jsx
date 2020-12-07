import React, {Component} from "react";
import {connect} from "react-redux";
import {getUpvotedSubmissions} from "../redux/actions/index";

// Marc
class UpvotedSubmissions extends Component {

    componentDidMount() {
        this.props.getUpvotedSubmissions();
    }

    render() {
        return (
            <>
                {this.props.upvotedSubmissions.map(s => {
                    return (
                        <p> {s.title}, {s.url} </p>
                    )
                })}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        upvotedSubmissions: state.upvotedSubmissions,
    }
}

const mapDispatchToProps = {
    getUpvotedSubmissions,
};

export default connect(mapStateToProps, mapDispatchToProps)
(UpvotedSubmissions);

