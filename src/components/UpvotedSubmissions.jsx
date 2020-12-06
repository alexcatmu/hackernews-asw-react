import React, {Component} from "react";
import {connect} from "react-redux";
import {getUpvotedSubmissions} from "../redux/actions";

// Marc
class UpvotedSubmissions extends Component {

    async componentDidMount() {
        await this.props.getUpvotedSubmissions();
        console.log(this.props.upvotedSubmissions);
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

