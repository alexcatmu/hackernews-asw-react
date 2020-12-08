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
