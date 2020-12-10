import React from "react";
import {connect} from "react-redux";
import {getUserByToken, logout} from "../redux/actions/index";


const token = localStorage.getItem('token');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            text: "Log in"
        };
    }

    componentDidMount() {
        if (token) {
            this.setState({
                input: token,
                text: "Logout"
            })
        }
    }

    updateInput = input => {
        this.setState({ input });
    };

    handleAddTodo = async () => {
        if (this.state.text === "Log in") {
            await this.props.getUserByToken(this.state.input);
            window.location.reload()

        } else {
            this.props.logout();
            this.setState({
                input: "",
                text: "Log in"
            });
        }

    };

    render() {
        return (
            <div>
                <input
                    onChange={e => this.updateInput(e.target.value)}
                    value={this.state.input}
                />
                <button className="add-todo" onClick={this.handleAddTodo}>
                    {this.state.text}
                </button>
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
    getUserByToken,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)
(Login);