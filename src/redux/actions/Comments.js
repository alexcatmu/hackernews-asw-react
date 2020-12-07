let url = "localhost:3000"

export function getComments() {
    let call = url + "/comments/:id";
    const config = {
        headers: {
            'Accept': 'application/json',
            'token': 'ya29.a0AfH6SMChsPOM0tvvkqR89oKw15EMbgU9N5wXKCu_vkGbob-cam8-PVvPRdpMLyPi0SsnCt-m8A5ebiWiz6jyhyv2Q2b6eeuQaxqZkcqf88IX7vnWZGF7hWOT7RQgDO3M4lTpxLrcE4XAo6Qiapj0ubPqcz7r9iB6EMK3-SA3TGA0VQ'
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