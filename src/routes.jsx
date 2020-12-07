import {Home} from "./components/Home";
import {Threads} from "./components/Threads"
import {Switch, Route, Redirect} from "react-router-dom";
import React from "react";
import {Newest} from "./components/Newest";
import {Ask} from "./components/Ask";
import {Submit} from "./components/Submit";
import {User} from "./components/User";
import {Submissions} from "./components/Submissions";
import {Contributions} from "./components/Contributions";
import {UpvotedComments} from "./components/UpvotedComments";
import {Replies} from "./components/Replies";
import Comments from "./components/Comments";
import UpvotedSubmissions from "./components/UpvotedSubmissions";
import Login from "./components/Login";


export const Routes = () => {

    return (

        <div>
            <Switch>
                {/* El primer que vull que m'aparegui ha d'estar al primer fill del switch*/}
                <Route exact path="/home" component={Home}/>
                <Route exact path="/newest" component={Newest}/>
                <Route exact path="/submitted/:id" component={Submissions}/>
                <Route exact path="/threads/:id" component={Threads}/>
                <Route exact path="/ask" component={Ask}/>
                <Route exact path="/submit" component={Submit}/>
                <Route exact path="/users/:id" component={User}/>
                <Route exact path="/contributions/:id" component={Contributions}/>
                <Route exact path="/upvoted/submissions" component={UpvotedSubmissions}/>
                <Route exact path="/upvoted/comments" component={UpvotedComments}/>
                <Route exact path="/login" component={Login}/>

                {/* es el replies/new/:id de ruby */}
                <Route exact path="/comments/:id" component={Comments}/>
                {/* replies de replies */}
                <Route exact path="/replies/:id" component={Replies}/>
                <Route path="/">
                    <Redirect to="/home"/>
                </Route>
            </Switch>
        </div>
    )
};
