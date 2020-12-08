let url = "https://hackernews-asw-12b.herokuapp.com"

export function getComments(id) {
    let call = url + `/comments/${id}`;
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
                        dispatch({type: "COMMENTS", payload: json});
                    })
                } else {
                    //tractar unauthorized or forbidden
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}

export function postReply(bodyPost) {
    let data = JSON.stringify(bodyPost);
    let call = url + "/replies";

    return function (dispatch) {
        return fetch(call, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: data
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
            }).then(json => {
                dispatch({type: "DATA_POST_COMPANY", payload: json});
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}
