let url = "https://hackernews-asw-12b.herokuapp.com"
// let url = "http://localhost:3000"


export function unvote(type, id) {
    let call = url + "/" + type + "/" + id + "/like";
    return function () {
        return fetch(call, {
            method: 'DELETE',
            headers: {
                'Accept': "application/json",
                'token': localStorage.getItem('token')
            },
        })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}

export function vote(type, id) {
    let call = url + "/" + type + "/" + id + "/like";
    return function () {
        return fetch(call, {
            method: 'PUT',
            headers: {
                'Accept': "application/json",
                'token': localStorage.getItem('token')
            },
        })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
}