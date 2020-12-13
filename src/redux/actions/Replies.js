let url = "https://hackernews-asw-12b.herokuapp.com"

export function getReplies(id) {
    let call = url + `/replies/${id}`;
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

export function postReplyReply(bodyPost) {
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
            .then(function (response) {
                if (response.ok){
                    return response.json()
                } else {
                    //tractar unauthorized forbidden
                }
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}
