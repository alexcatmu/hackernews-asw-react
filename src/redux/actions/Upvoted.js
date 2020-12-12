import {UPVOTED_SUBMISSIONS, UPVOTED_COMMENTS} from "../actionTypes";

let url = "https://hackernews-asw-12b.herokuapp.com"

export function getUpvotedSubmissions() {
    let call = url + "/upvoted/submissions";
    const config = {
        headers: {
            'Accept': 'application/json',
            'token': localStorage.getItem('token')
        }
    };
    return function (dispatch) {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch({type: "UPVOTED_SUBMISSIONS", payload: json});
                    })
                }
                else {
                    //tractar unauthorized or forbidden
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}

export function getUpvotedComments() {
    let call = url + "/upvoted/comments";
    const config = {
        headers: {
            'Accept': 'application/json',
            'token': localStorage.getItem('token')
        }
    };
    return function (dispatch) {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch({type: "UPVOTED_COMMENTS", payload: json});
                    })
                }
                else {
                    //tractar unauthorized or forbidden
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}
