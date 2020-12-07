import React, {Component} from "react";
import {connect} from "react-redux";
import {getComments} from "../redux/actions/index";

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
                        <p>tenemos comments</p>
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

