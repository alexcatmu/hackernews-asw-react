import React from "react";
import {connect} from "react-redux";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    updateInput = input => {
        this.setState({ input });
    };

    handleAddTodo = () => {
        console.log(this.state.input);
    };

    render() {
        return (
            <div>
                <input
                    onChange={e => this.updateInput(e.target.value)}
                    value={this.state.input}
                />
                <button className="add-todo" onClick={this.handleAddTodo}>
                    Log In
                </button>
            </div>
        );
    }
}

function mapStateToProps() {
    return {
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)
(Login);