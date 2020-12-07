import React, {Component} from "react";
import {connect} from "react-redux";
import {getComments} from "../redux/actions/index";

// Alex
class Comments extends Component {

    componentDidMount() {
        this.props.getComments();
    }

    render() {
        return (
            <>
                {this.props.comments.map(s => {
                    return (
                        <p> hola pesicola </p>
                    )
                })}
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

