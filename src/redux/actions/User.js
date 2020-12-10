import {LOGIN, LOGOUT} from "../actionTypes";

let url = "https://hackernews-asw-12b.herokuapp.com"


export function getUser(id) {
    let call = url + "/users/" + id;
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    return function (dispatch) {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch({type: "USER", payload: json});
                    })
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}

export function getUserByToken(token) {
    let call = url + "/users";
    const config = {
        headers: {
            'Accept': 'application/json',
            'token': token
        }
    };
    return function (dispatch) {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        dispatch({type: "LOGIN", payload: json});
                    })
                }
                else {
                    dispatch({type: "LOGOUT"});
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}

export function logout() {
    return {type: LOGOUT};
}