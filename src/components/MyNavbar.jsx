import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar'
// all together
export class MyNavbar extends Component {
    render() {
        return <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">Hacker News</Navbar.Brand>
                |
                <Navbar.Brand href="/newest">new</Navbar.Brand>
                |
                <Navbar.Brand href="/threads/:id">threads</Navbar.Brand>
                |
                <Navbar.Brand href="/ask">ask</Navbar.Brand>
                |
                <Navbar.Brand href="/submit">submit</Navbar.Brand>
                |
                <Navbar.Brand href="/users/:id">usuariop</Navbar.Brand>
            </Navbar>
            <br />
        </>
    }
}
