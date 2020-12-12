import React, {Component} from "react";

//TODO: Alexandre
export class Submit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            text: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle= this.handleTitle.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
        this.handleText = this.handleText.bind(this);

    }
    handleTitle(event) {
        this.setState({title: event.target.title});
    }
    handleUrl(event) {
        this.setState({url: event.target.url});
    }
    handleText(event) {
        this.setState({text: event.target.text});
    }

    handleSubmit(event) {
        console.log(event)
        event.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Title:
                        <input value={this.state.title} name="title" onChange={this.handleTitle} />
                        <br/>
                        Url:
                        <input value={this.state.url} name="url" onChange={this.handleUrl} />
                        <br/>
                        Text:
                        <textarea value={this.state.text} name="text" onChange={this.handleText} />
                    </label>
                    <br/>

                    <input type="submit" value="Submit"/>
                </form>
            </>
        );
    }
}
