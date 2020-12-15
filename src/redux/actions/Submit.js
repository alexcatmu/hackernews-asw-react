let baseUrl = "https://hackernews-asw-12b.herokuapp.com";
// let baseUrl = "http://localhost:3000"

export function submit(title, url, text) {
    let call = baseUrl + "/contributions/";
    let data = JSON.stringify({title, url, text})

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
                return response.json();
            })
            .catch(error => console.log('Something failed : ' + error.message));
    }
}