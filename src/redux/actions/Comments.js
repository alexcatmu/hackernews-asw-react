let url = "https://hackernews-asw-12b.herokuapp.com"
//let url = "http://localhost:3000"

export function getComments(id) {
    let call = url + `/comments/${id}`;
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    return function () {
        return fetch(call, config)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    //tractar unauthorized or forbidden
                }
            })
            .catch(error => console.log('Error fetching data : ' + error.message));
    };
}

export function postComment(bodyPost) {
    let data = JSON.stringify(bodyPost);
    let call = url + "/comments";

    return function () {
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
                return response;
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}

export function postReply(bodyPost) {
    let data = JSON.stringify(bodyPost);
    let call = url + "/replies";

    return function () {
        return fetch(call, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: data
        })
            .then(response => {
                return response;
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}
